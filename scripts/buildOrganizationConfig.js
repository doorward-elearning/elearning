const path = require('path');
const colors = require('colors');
const fs = require('fs');

const environments = path.join(__dirname, '../elearning-ops/helm/charts/apps/config');

const destinations = [path.join(__dirname, '../dist/apps/doorward-backend/config/organization.yaml')];

const buildOrganizationConfig = async () => {
  const customer = process.env.DEFAULT_ORGANIZATION_NAME;

  if (customer) {
    console.log(colors.cyan('Building organization configuration... [' + customer + ']'));

    const configFile = path.join(environments, customer + '.yaml');

    if (!fs.existsSync(configFile)) {
      console.error(colors.red('Config file does not exist: ' + configFile));
      return;
    }

    const configFileContent = fs.readFileSync(configFile, 'utf8');

    await Promise.all(
      destinations.map(async (destination) => {
        fs.writeFileSync(destination, configFileContent);
      })
    );
  } else {
    console.error(colors.red('Env variable: DEFAULT_ORGANIZATION_NAME is not defined.'));
  }
};

buildOrganizationConfig().then();
