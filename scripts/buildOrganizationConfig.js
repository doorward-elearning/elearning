const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const _ = require('lodash');
const colors = require('colors');
const ncp = require('ncp');
const beautify = require('js-beautify');

const source = path.join(__dirname, '../apps/doorward-backend/src/config/default');
const environments = path.join(__dirname, '../elearning-ops/helm/charts/apps/config');

const organizationFiles = fs.existsSync(environments)
  ? fs.readdirSync(environments).filter((name) => {
      return name.endsWith('yaml') && !['Chart.yaml', 'secrets.yaml', 'values.yaml'].includes(name);
    })
  : [];

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

const mergeConfig = (config) => {
  const map = [
    { file: 'meetings.config.json', path: 'meetings.default' },
    { file: 'meetings.config.moderator.json', path: 'meetings.moderator' },
    { file: 'meetings.config.publisher.json', path: 'meetings.publisher' },
    { file: 'meetings.config.subscriber.json', path: 'meetings.subscriber' },
    { file: 'meetings.interface.json', path: 'meeting-interface.default' },
    { file: 'meetings.interface.moderator.json', path: 'meeting-interface.moderator' },
    { file: 'meetings.interface.publisher.json', path: 'meeting-interface.publisher' },
    { file: 'meetings.interface.subscriber.json', path: 'meeting-interface.subscriber' },
    { file: 'organization.json', path: 'organization' },
  ];

  const organizationName = config.customer;

  map.forEach((item) => {
    const existing = JSON.parse(fs.readFileSync(path.join(source, item.file)).toString());

    let result = existing;

    const destination = _.get(config, item.path);

    if (destination) {
      result = _.merge({}, existing, destination);
    }

    destinations.map((destination) => {
      mkDir(path.join(destination, organizationName));
      fs.writeFileSync(
        path.join(destination, organizationName, item.file),
        beautify.js_beautify(JSON.stringify(result))
      );
    });
  });
};

const createFile = (organizationName) => {
  console.log(colors.yellow(' - ' + organizationName));

  if (fs.existsSync(path.join(environments, organizationName))) {
    const file = fs.readFileSync(path.join(environments, organizationName), 'utf8');
    const destination = YAML.parse(file);

    mergeConfig(destination);
  }
};

const buildOrganizationConfig = async () => {
  console.log(colors.cyan('Building organization configuration...'));

  organizationFiles.forEach((organizationName) => {
    createFile(organizationName);
  });
  console.log(colors.green('Config files written to: ' + destinations.join(', ')));
};

buildOrganizationConfig().then();
