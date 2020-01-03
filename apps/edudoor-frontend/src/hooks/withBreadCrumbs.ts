import { BreadCrumb } from '../components/ui/BreadCrumbs';
import useRoutes from './useRoutes';

const withBreadCrumbs = (): {
  breadcrumbs: Array<BreadCrumb>;
  titles: string;
} => {
  const routes = useRoutes();
  const tree = routes.currentRoute;

  const pathNames = tree ? routes[tree].tree : [];
  const breadcrumbs = (pathNames as Array<keyof typeof routes.routes>).map((item): BreadCrumb => routes[item]);
  const titles = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 1].name : '';
  return {
    breadcrumbs,
    titles,
  };
};

export default withBreadCrumbs;
