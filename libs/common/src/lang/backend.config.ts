import { i18n } from 'i18next';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { capitalize } from 'lodash';

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

const LOCALES_PATH = '../../../locales';

const configureLang = (path = LOCALES_PATH, configure: (i18n: i18n) => i18n = (i18n) => i18n) => {
  return configure(i18next.use(Backend)).init({
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    initImmediate: false,
    preload: readdirSync(join(__dirname, path)).filter((fileName) => {
      const joinedPath = join(__dirname, path, fileName);
      return lstatSync(joinedPath).isDirectory();
    }),
    ns: 'default',
    defaultNS: 'default',
    backend: {
      loadPath: join(__dirname, path, '{{lng}}/{{lng}}.{{ns}}.json'),
    },
    interpolation: {
      defaultVariables: {},
      skipOnVariables: true,
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        if (format === 'capitalize') return capitalize(value);
        return value;
      },
    },
  });
};

export default configureLang;
