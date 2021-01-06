import { useHistory, useLocation } from 'react-router';
import queryString, { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

export interface UseQueryParams<T> {
  query: T;
  updateLocation: (params: ParsedUrlQuery, pathname?: string) => void;
}

const useQueryParams = <T extends {} = any>(): UseQueryParams<T> => {
  const location = useLocation();
  const history = useHistory();

  const query = queryString.parse(location.search.substring(1));

  return {
    query: query as T,
    updateLocation: (params, pathname) => {
      history.push(
        (pathname || location.pathname) +
          '?' +
          queryString.stringify(
            _.pickBy(
              {
                ...query,
                ...params,
              },
              _.identity
            )
          )
      );
    },
  };
};

export default useQueryParams;
