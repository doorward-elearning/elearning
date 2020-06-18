import { useHistory, useLocation } from 'react-router';
import queryString, { ParsedUrlQuery } from 'querystring';

export interface UseQueryParams<T> {
  query: T;
  updateLocation: (params: ParsedUrlQuery) => void;
}

const useQueryParams = <T extends ParsedUrlQuery = any>(): UseQueryParams<T> => {
  const location = useLocation();
  const history = useHistory();

  const query = queryString.parse(location.search.substring(1));

  return {
    query: query as T,
    updateLocation: params => {
      history.push(
        location.pathname +
          '?' +
          queryString.stringify({
            ...query,
            ...params,
          })
      );
    },
  };
};

export default useQueryParams;
