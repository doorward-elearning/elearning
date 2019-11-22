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
  const titles = breadcrumbs
    .filter(crumb => crumb.name !== routes.dashboard.name)
    .reduce((acc, crumb, index) => {
      let result = acc;
      if (index > 0) {
        result += ' | ';
      }
      return result + crumb.name;
    }, '');
  return {
    breadcrumbs,
    titles,
  };
};

export default withBreadCrumbs;
