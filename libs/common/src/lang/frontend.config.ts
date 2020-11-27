import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import Tools from '@doorward/common/utils/Tools';

const configureLang = (baseUrl: string) => {
  return new Promise((resolve, reject) => {
    i18next
      .use(Backend)
      .init({
        fallbackLng: 'en',
        lng: 'en',
        debug: process.env.NODE_ENV === 'development',
        initImmediate: false,
        ns: 'default',
        defaultNS: 'default',
        backend: {
          loadPath: Tools.joinURL(baseUrl, 'resources/translations'),
        },
        interpolation: {
          defaultVariables: {},
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

export default configureLang;
