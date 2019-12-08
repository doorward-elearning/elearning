import MRouter from '../../utils/router';

const Router = new MRouter('/healthcheck');

Router.get('', () => {
  return [200, { timestamp: new Date() }];
});

export default Router;
