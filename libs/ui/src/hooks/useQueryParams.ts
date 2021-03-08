import { useHistory, useLocation } from 'react-router';
import queryString, { ParsedUrlQuery } from 'querystring';
import _ from 'lodash';

export interface UseQueryParams<T> {
  query: T;
  updateLocation: (params: ParsedUrlQuery, pathname?: string) => void;
  withQuery: (params: ParsedUrlQuery, pathname?: string) => string;
}

const useQueryParams = <T extends {} = any>(): UseQueryParams<T> => {
  const location = useLocation();
  const history = useHistory();

  const query = queryString.parse(location.search.substring(1));

  const createPath = (params: ParsedUrlQuery, pathname: string) =>
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
    );

  return {
    query: query as T,
    updateLocation: (params, pathname) => {
      history.push(createPath(params, pathname));
    },
    withQuery: createPath,
  };
};

export default useQueryParams;
