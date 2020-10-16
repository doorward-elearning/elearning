import { useHistory, useLocation } from 'react-router';
import queryString, { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

export interface UseQueryParams<T> {
  query: T;
  updateLocation: (params: ParsedUrlQuery) => void;
}

const useQueryParams = <T extends {} = any>(): UseQueryParams<T> => {
  const location = useLocation();
  const history = useHistory();

  const query = queryString.parse(location.search.substring(1));

  return {
    query: query as T,
    updateLocation: (params) => {
      history.push(
        location.pathname +
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
