import { BreadCrumb } from '../components/ui/BreadCrumbs';
import useRoutes from './useRoutes';

const withBreadCrumbs = (): Array<BreadCrumb> => {
  const routes = useRoutes();
  const tree = routes.currentRoute;

  const pathNames = tree ? routes[tree].tree : [];
  return (pathNames as Array<keyof typeof routes.routes>).map((item): BreadCrumb => routes[item]);
};

export default withBreadCrumbs;
