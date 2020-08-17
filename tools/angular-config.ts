const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js;
const color = require('colors');

require('dotenv').config({
  path: '.env',
});

// read all the apps
const folders = fs
  .readdirSync('apps', {
    withFileTypes: true,
  })
  .filter((file) => file.isDirectory());

const createEnvironmentFile = (environment: string) => {
  if (fs.existsSync(environment)) {
    const data = fs.readFileSync(environment, 'utf8').replace('export const environment', 'module.exports');
    // skip this file if it has been ignored
    if (data.trim().startsWith('//ignore-config')) {
      return;
    }
    fs.writeFileSync(environment, data);

    const file = require('../' + environment);

    if (file) {
      Object.keys(file).map((key) => {
        file[key] = process.env[key] || file[key];
      });
    }

    const output = beautify(
      `
    // This is an automatically generated file.
    // Only update the environment keys and not the values.

    // To update the values, edit the .env file at the root of the project with the exact environment key.
    // To see more, see [/tools/angular-config.ts] at the root of the project.

    // Add //ignore-config at the top of this file to avoid automatic generation

    export const environment = ${JSON.stringify(file)}; `,
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        indent_size: 2,
        // eslint-disable-next-line @typescript-eslint/camelcase
        space_in_empty_paren: true,
      }
    );

    fs.writeFileSync(environment, output);
  }
};

console.log(color.cyan('Generating environment config'));
// for each of the app, go to the environment
folders.forEach((folder) => {
  createEnvironmentFile(path.join('./apps', folder.name, 'src', 'environments', 'environment.ts'));
  createEnvironmentFile(path.join('./apps', folder.name, 'src', 'environments', 'environment.prod.ts'));
  process.stdout.write(color.cyan('..'));
});
process.stdout.write(color.green('\nDone\n'));
