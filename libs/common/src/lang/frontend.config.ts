import i18next from 'i18next';
import Backend from 'i18next-http-backend';

const configureLang = () => {
  return i18next.use(Backend).init({
    fallbackLng: 'en',
    lng: 'en',
    debug: process.env.NODE_ENV === 'development',
    initImmediate: false,
    ns: 'default',
    defaultNS: 'default',
    backend: {
      loadPath: 'https://localhost:7000/api/v1/resources/locales/{{lng}}/{{lng}}.{{ns}}.json',
    },
    interpolation: {
      defaultVariables: {},
    },
  });
};

export default configureLang;
