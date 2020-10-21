const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const colors = require('colors');

const LANGUAGES_PATH = path.join(__dirname, '../lang');
const ORGANIZATIONS_PATH = path.join(__dirname, '../organization-config');

const languages = fs.readdirSync(LANGUAGES_PATH);

const organizations = fs.readdirSync(ORGANIZATIONS_PATH);

const performReplacement = (str, organization) => {
  const regex = /{{(\w+)}}/g;
  let result;
  while ((result = regex.exec(str))) {
    const token = result[0];
    const value = result[1];
    if (organization) {
      str = str.replace(token, organization.models[value]);
    } else {
      str = str.replace(token, _.capitalize(value));
    }
  }
  return str;
};

const configureLanguage = (lang, organization) => {
  Object.keys(lang).forEach((key) => {
    lang[key] = performReplacement(lang[key], organization);
  });

  return lang;
};

console.log(colors.cyan('Building language translations...'));

languages.forEach((lang) => {
  organizations.forEach((organization) => {
    const destination = path.join(ORGANIZATIONS_PATH, organization, 'lang');
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    const langContent = JSON.parse(fs.readFileSync(path.join(LANGUAGES_PATH, lang)).toString('utf-8'));

    if (fs.existsSync(path.join(ORGANIZATIONS_PATH, organization, 'organization.json'))) {
      const orgContent = JSON.parse(
        fs.readFileSync(path.join(ORGANIZATIONS_PATH, organization, 'organization.json')).toString('utf-8')
      );

      console.log(colors.yellow('- ' + organization));

      const result = configureLanguage(langContent, orgContent);
      fs.writeFileSync(path.join(destination, lang), JSON.stringify(result), { encoding: 'utf-8' });
    }
  });
});

console.log(colors.cyan('Done.'));
