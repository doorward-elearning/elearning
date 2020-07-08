import * as express from 'express';
import Validation from '../middleware/BaseValidator';
import Tools from './Tools';
import { IRouterMatcher } from 'express-serve-static-core';

const errorHandler = middleware => middleware.map(m => Validation.withErrorHandler(m));

const methods = ['post', 'delete', 'get', 'put', 'patch'];

export interface CustomRouter {
  get: IRouterMatcher<this>;
  post: IRouterMatcher<this>;
  put: IRouterMatcher<this>;
  delete: IRouterMatcher<this>;
  patch: IRouterMatcher<this>;
}

class MRouter implements CustomRouter {
  Router: express.Router;
  defaultMiddleware: Array<express.RequestHandler>;
  path: string;
  delete: IRouterMatcher<this>;
  get: IRouterMatcher<this>;
  patch: IRouterMatcher<this>;
  post: IRouterMatcher<this>;
  put: IRouterMatcher<this>;

  constructor(path = '', ...defaultMiddleware) {
    this.Router = express.Router({ mergeParams: true });
    this.defaultMiddleware = defaultMiddleware;
    this.path = path;

    methods.forEach(method => {
      this[method] = (route, ...middleware) => {
        this.Router[method](
          Tools.appendPath(path, route),
          errorHandler(MRouter.uniqueMiddleware(this.defaultMiddleware, middleware))
        );
      };
    });
  }

  use(path, router) {
    this.Router.use(Tools.appendPath(this.path, path), router.Router);
    return this;
  }

  exclude(...middleware) {
    const found = m => middleware.find(a => a.toString() === m.toString());
    this.defaultMiddleware = this.defaultMiddleware.filter(m => !found(m));

    return this;
  }

  static uniqueMiddleware(defaultMiddleware, middleware) {
    const list = [];
    defaultMiddleware.forEach(m => {
      let found = null;
      middleware.forEach(m1 => {
        if (m.toString() === m1.toString()) {
          found = m1;
        }
      });
      if (found) {
        list.push(found);
        middleware.splice(middleware.indexOf(found), 1);
      } else {
        list.push(m);
      }
    });
    return [...list, ...middleware];
  }
}

export default MRouter;
