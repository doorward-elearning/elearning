import { BreadCrumb } from '../components/ui/BreadCrumbs';
import { EdudoorRoutes } from '../routes';
import useRoutes from './useRoutes';
import { match as Match } from 'react-router';

const withBreadCrumbs = (match: Match): Array<BreadCrumb> => {
  const { routes } = useRoutes();
  const tree = (Object.keys(routes) as Array<keyof EdudoorRoutes>).find(route => {
    const detail = routes[route];
    if (detail) {
      return detail.link === match.path || detail.link === match.url;
    }
    return false;
  });

  const pathNames = tree ? routes[tree].tree : [];
  return (pathNames as Array<keyof typeof routes>).map((item): BreadCrumb => routes[item]);
};

export default withBreadCrumbs;
