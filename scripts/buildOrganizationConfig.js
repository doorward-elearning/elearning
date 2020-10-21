const fs = require('fs');
const path = require('path');
const colors = require('colors');

const environments = path.join(__dirname, '../helm/environments');

const directories = fs.readdirSync(environments);

const mkDir = (pathLike) => {
  if (!fs.existsSync(pathLike)) {
    fs.mkdirSync(pathLike);
  }
};

const destinations = [path.join(__dirname, '../organization-config/')];

destinations.forEach((destination) => {
  mkDir(destination);
});

console.log(colors.cyan('Building organization configuration...'));

directories.forEach((dirName) => {
  const dir = path.join(environments, dirName);
  if (fs.lstatSync(dir).isDirectory()) {
    destinations.forEach((destination) => {
      if (fs.existsSync(path.join(dir, 'organization.json'))) {
        console.log(colors.yellow('[Organization]'), colors.yellow(' - ' + dirName));
        mkDir(path.join(destination, dirName));
        fs.copyFileSync(path.join(dir, 'organization.json'), path.join(destination, dirName, 'organization.json'));
      }
      if (fs.existsSync(path.join(dir, 'roles.json'))) {
        console.log(colors.yellow('[Roles]'), colors.yellow(' - ' + dirName));
        mkDir(path.join(destination, dirName));
        fs.copyFileSync(path.join(dir, 'roles.json'), path.join(destination, dirName, 'roles.json'));
      }
    });
  }
});

console.log(colors.green('Config files written to: ' + destinations.join(', ')));
console.log(colors.cyan('Done.'));
