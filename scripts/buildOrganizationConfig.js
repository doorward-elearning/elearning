const fs = require('fs');
const path = require('path');
const colors = require('colors');
const ncp = require('ncp');

const environments = path.join(__dirname, '../helm/environments');

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

const source = path.join(__dirname, '../apps/doorward-backend/src/config/default');

const destinations = [path.join(__dirname, '../dist/apps/doorward-backend/config')];

destinations.forEach((destination) => {
  mkDir(destination);
});

const buildOrganizationConfig = async () => {
  console.log(colors.cyan('Building organization configuration...'));
  await Promise.all(
    directories.map(async (dirName) => {
      const dir = path.join(environments, dirName);
      if (fs.lstatSync(dir).isDirectory()) {
        await Promise.all(
          destinations.map(async (destination) => {
            copyDirectory(source, path.join(destination, dirName));
            if (fs.existsSync(path.join(dir, 'organization.json'))) {
              console.log(colors.yellow('[Organization]'), colors.yellow(' - ' + dirName));
              mkDir(path.join(destination, dirName));
              fs.copyFileSync(
                path.join(dir, 'organization.json'),
                path.join(destination, dirName, 'organization.json')
              );
            }
            if (fs.existsSync(path.join(dir, 'roles.json'))) {
              console.log(colors.yellow('[Roles]'), colors.yellow(' - ' + dirName));
              mkDir(path.join(destination, dirName));
              fs.copyFileSync(path.join(dir, 'roles.json'), path.join(destination, dirName, 'roles.json'));
            }
          })
        );
      }
    })
  );
  console.log(colors.green('Config files written to: ' + destinations.join(', ')));
};

buildOrganizationConfig().then();
