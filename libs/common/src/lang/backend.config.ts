import i18next from 'i18next';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import Backend from 'i18next-fs-backend';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

const LOCALES_PATH = '../../../locales';

const configureLang = (organization: OrganizationEntity) => {
  return i18next.use(Backend).init({
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
    },
  });
};

export default configureLang;
