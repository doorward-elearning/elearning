import i18next, { i18n } from 'i18next';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { capitalize } from 'lodash';
import Backend from 'i18next-fs-backend';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

const LOCALES_PATH = '../../../locales';

const configureLang = (organization: OrganizationEntity, configure: (i18n: i18n) => i18n = (i18n) => i18n) => {
  return configure(i18next.use(Backend)).init({
    fallbackLng: 'en',
    lng: 'en',
    debug: process.env.NODE_ENV === 'development',
    initImmediate: false,
    preload: readdirSync(join(__dirname, LOCALES_PATH)).filter((fileName) => {
      const joinedPath = join(__dirname, LOCALES_PATH, fileName);
      return lstatSync(joinedPath).isDirectory();
    }),
    ns: 'default',
    defaultNS: 'default',
    backend: {
      loadPath: join(__dirname, LOCALES_PATH, '{{lng}}/{{lng}}.{{ns}}.json'),
    },
    interpolation: {
      defaultVariables: {
        ...(organization?.models || {}),
      },
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
