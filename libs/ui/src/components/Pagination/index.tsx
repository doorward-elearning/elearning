import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import ItemArray from '../ItemArray';
import './Pagination.scss';
import Button from '../Buttons/Button';
import IfElse from '../IfElse';

type Page = {
  page: number;
  name: string;
};
const getPages = (numPages: number, maxDisplay = 10, currentPage = 1): Array<Page> => {
  const pages: Array<Page> = [];
  pages.push({
    page: 1,
    name: 'First',
  });
  if (maxDisplay < 5) {
    throw Error('The minimum value for "maxDisplay" is 5');
  }
  const right = Math.min(Math.ceil((maxDisplay - 2 - 1) / 2), numPages - currentPage - 1);
  const left = maxDisplay - 2 - 1 - right;

  const start = Math.max(2, currentPage - left);
  for (let i = start; i < Math.min(start + maxDisplay - 2, numPages); i++) {
    const page = i;
    pages.push({
      page: page,
      name: `${page}`,
    });
  }
  pages.push({
    page: numPages,
    name: 'Last',
  });
  return pages;
};

const Pagination: FunctionComponent<PaginationProps> = (props): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(props.page);

  useEffect(() => {
    if (currentPage != props.page) {
      props.onChangePage(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(props.page);
  }, [props.page]);

  const pages = useMemo(() => getPages(props.numPages, props.maxDisplay, currentPage), [props.numPages, currentPage]);

  let previousPage = pages[0];
  return (
    <IfElse condition={props.numPages > 1}>
      <div className="ed-pagination">
        <Button
          mini
          bordered
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          icon="skip_previous"
        >
          Previous
        </Button>
        <div className="ed-pagination__pages">
          <ItemArray data={pages}>
            {page => {
              const button = (
                <React.Fragment>
                  <IfElse condition={page.page - previousPage.page > 1}>
                    <span>...</span>
                  </IfElse>
                  <Button mini bordered={page.page != currentPage} onClick={() => setCurrentPage(page.page)}>
                    {page.name}
                  </Button>
                </React.Fragment>
              );
              previousPage = page;
              return button;
            }}
          </ItemArray>
        </div>
        <Button
          mini
          bordered
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === props.numPages}
          icon="skip_next"
        >
          Next
        </Button>
      </div>
    </IfElse>
  );
};

export interface PaginationProps {
  page: number;
  numPages: number;
  onChangePage: (page: number) => void;
  maxDisplay?: number;
}

export default Pagination;