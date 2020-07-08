import { BreadCrumb } from '../components/BreadCrumbs';
import { RouteNames, Routes } from '@doorward/ui/types';

function useBreadCrumbs<T extends RouteNames>(
  routes: Routes<T>
): {
  breadcrumbs: Array<BreadCrumb>;
  titles: string;
} {
  const tree = routes.currentRoute;

  const pathNames = tree ? routes[tree].tree : [];
  const breadcrumbs = (pathNames as Array<keyof typeof routes.routes>).map((item): BreadCrumb => routes.routes[item]);
  const titles = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 1].name : '';
  return {
    breadcrumbs,
    titles,
  };
}

export default useBreadCrumbs;
