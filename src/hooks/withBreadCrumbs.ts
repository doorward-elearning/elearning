import { BreadCrumb } from '../components/ui/BreadCrumbs';
import { Location } from 'history';
import ROUTES, { EdudoorRoutes } from '../routes/routes';

const withBreadCrumbs = (location: Location): Array<BreadCrumb> => {
  const tree = (Object.keys(ROUTES) as Array<keyof EdudoorRoutes>).find(route => {
    const detail = ROUTES[route];
    if (detail) {
      return detail.link === location.pathname;
    }
    return false;
  });

  return tree ? ROUTES[tree].tree : [];
};

export default withBreadCrumbs;
