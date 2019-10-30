import MRouter from '../utils/router';
import users from './users';
import courses from './courses';

const modules = {
  users,
  courses,
};

const apiVersion = '/api/v1';

export default app => {
  const createEndpoint = (module, route) => {
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
