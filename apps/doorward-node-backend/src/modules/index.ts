import MRouter from '../utils/router';
import users from './users';
import forums from './forums';
import reports from './reports';
import healthCheck from './healthcheck';
import meetingRooms from './meetings';
import schools from './schools';
import organizations from './organizations';
import storage from './storage';
import groups from './groups';
import suggestions from './suggestions';
import { Application } from 'express';

const modules = {
  users,
  forums,
  reports,
  storage,
  healthCheck,
  meetingRooms,
  organizations,
  groups,
  schools,
  suggestions,
};

const apiVersion = `${process.env.API_PREFIX || ''}`;

export default (app: Application) => {
  const createEndpoint = (module, route): void => {
    let router = route;
    if (route.constructor === MRouter) {
      router = router.Router;
    }
    app.use(apiVersion, router);
  };

  Object.keys(modules).forEach(module => {
    if (modules[module].constructor === Array) {
      modules[module].forEach(route => {
        createEndpoint(module, route);
      });
    } else {
      createEndpoint(module, modules[module]);
    }
  });
  return app;
};
