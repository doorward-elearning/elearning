import React, { useEffect } from 'react';
import Pagination from '@doorward/ui/components/Pagination';
import WebComponent, { WebComponentProps } from '@doorward/ui/components/WebComponent';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import { PaginatedResponse } from '@doorward/common/dtos/response/base.response';
import { WebComponentState } from '@doorward/api-actions/types';

function PaginationContainer<T extends PaginatedResponse, Data>(props: PaginationContainerProps<T, Data>): JSX.Element {
  const {
    query: { page },
    updateLocation,
  } = useQueryParams<{ page: string }>();
  const pagination = props.state.data?.pagination;

  useEffect(() => {
    if (+page !== pagination?.page || page === undefined) {
      props.onChangePage(+page);
    }
  }, [page]);

  return (
    <div className="ed-pagination__container">
      <WebComponent loading={props.state.fetching} {...props} showRefreshingProgress>
        {(data) => (
          <React.Fragment>
            <div className="ed-pagination__container--content">{props.children(data)}</div>
          </React.Fragment>
        )}
      </WebComponent>
      {pagination && (
        <div className="ed-pagination__container--footer">
          <Pagination
            page={+pagination.page}
            numPages={pagination.totalPages}
            onChangePage={(currentPage) => {
              updateLocation({ page: `${currentPage}` });
            }}
          />
        </div>
      )}
    </div>
  );
}

export interface PaginationContainerProps<T extends PaginatedResponse, Data>
  extends Omit<WebComponentProps<Data>, 'loading'> {
  state: WebComponentState<T>;
  onChangePage: (page: number) => void;
}

export default PaginationContainer;
