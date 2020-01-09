import MRouter from '../utils/router';
import users from './users';
import courses from './courses';
import reports from './reports';
import healthCheck from './healthcheck';
import meetingRooms from './meetings';
import { Application } from 'express';

const modules = {
  users,
  courses,
  reports,
  healthCheck,
  meetingRooms,
};

const apiVersion = '/api/v1';

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
