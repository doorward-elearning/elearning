const fs = require('fs');
const path = require('path');

const environments = path.join(__dirname, '../helm/environments');

const directories = fs.readdirSync(environments);

const mkDir = (pathLike) => {
  if (!fs.existsSync(pathLike)) {
    fs.mkdirSync(pathLike);
  }
};

const destinations = [path.join(__dirname, '../dist/apps/doorward-backend/config')];

destinations.forEach((destination) => {
  mkDir(destination);
});

directories.forEach((dirName) => {
  const dir = path.join(environments, dirName);
  if (fs.lstatSync(dir).isDirectory()) {
    destinations.forEach((destination) => {
      if (fs.existsSync(path.join(dir, 'organization.json'))) {
        mkDir(path.join(destination, dirName));
        fs.copyFileSync(path.join(dir, 'organization.json'), path.join(destination, dirName, 'organization.json'));
      }
      if (fs.existsSync(path.join(dir, 'roles.json'))) {
        mkDir(path.join(destination, dirName));
        fs.copyFileSync(path.join(dir, 'roles.json'), path.join(destination, dirName, 'roles.json'));
      }
    });
  }
});
