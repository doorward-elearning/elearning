import React, { useEffect } from 'react';
import { PaginatedWebComponentState } from '@edudoor/ui/reducers/reducers';
import Pagination from '@edudoor/ui/components/Pagination';
import WebComponent, { WebComponentProps } from '@edudoor/ui/components/WebComponent';
import useQueryParams from '@edudoor/ui/hooks/useQueryParams';

function PaginationContainer<T>(props: PaginationContainerProps<T>): JSX.Element {
  const {
    query: { page },
    updateLocation,
  } = useQueryParams<{ page: string }>();
  const {
    data: { meta },
  } = props.state;

  useEffect(() => {
    if (page !== meta?.pagination.page || page === undefined) {
      props.onChangePage(+page);
    }
  }, [page]);

  return (
    <div className="ed-pagination__container">
      <WebComponent loading={props.state.fetching} {...props} showRefreshingProgress>
        {data => (
          <React.Fragment>
            <div className="ed-pagination__container--content">{props.children(data)}</div>
          </React.Fragment>
        )}
      </WebComponent>
      {meta?.pagination && (
        <div className="ed-pagination__container--footer">
          <Pagination
            page={+meta?.pagination.page}
            numPages={meta?.pagination.pages}
            onChangePage={currentPage => {
              updateLocation({ page: `${currentPage}` });
            }}
          />
        </div>
      )}
    </div>
  );
}

export interface PaginationContainerProps<T> extends Omit<WebComponentProps<T>, 'loading'> {
  state: PaginatedWebComponentState;
  onChangePage: (page: number) => void;
}

export default PaginationContainer;
