import { useLocation } from 'react-router';
import queryString from 'querystring';

const useQueryParams = () => {
  const location = useLocation();

  return queryString.parse(location.search.substring(1));
};

export default useQueryParams;
