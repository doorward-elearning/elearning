const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const colors = require('colors');
const ncp = require('ncp');
const beautify = require('js-beautify');

const source = path.join(__dirname, '../apps/doorward-backend/src/config/default');
const environments = path.join(__dirname, '../helm/environments');

const configFiles = fs.readdirSync(source);
const directories = fs.readdirSync(environments);

const mkDir = (pathLike) => {
  if (!fs.existsSync(pathLike)) {
    fs.mkdirSync(pathLike);
  }
};

const copyDirectory = (source, destination) => {
  return new Promise((resolve) => {
    ncp(source, destination, {}, resolve);
  });
};

const destinations = [path.join(__dirname, '../dist/apps/doorward-backend/config')];

destinations.forEach((destination) => {
  mkDir(destination);
});

const createFile = (fileName, organizationName) => {
  console.log(colors.yellow('[' + fileName.replace('.json', '') + ']'), colors.yellow(' - ' + organizationName));
  const existing = JSON.parse(fs.readFileSync(path.join(source, fileName)).toString());

  let result;

  if (fs.existsSync(path.join(environments, organizationName, fileName))) {
    const destination = JSON.parse(fs.readFileSync(path.join(environments, organizationName, fileName)).toString());
    result = _.merge({}, existing, destination);
  } else {
    result = existing;
  }

  destinations.map((destination) => {
    mkDir(path.join(destination, organizationName));
    fs.writeFileSync(path.join(destination, organizationName, fileName), beautify.js_beautify(JSON.stringify(result)));
  });
};

const buildOrganizationConfig = async () => {
  console.log(colors.cyan('Building organization configuration...'));

  configFiles.forEach((configFile) => {
    directories.forEach((organizationName) => {
      createFile(configFile, organizationName);
    });
  });
  console.log(colors.green('Config files written to: ' + destinations.join(', ')));
};

buildOrganizationConfig().then();
