import React, { FunctionComponent, useEffect, useState } from 'react';
import ItemArray from '../ItemArray';
import './Pagination.scss';
import Button from '../Buttons/Button';

const Pagination: FunctionComponent<PaginationProps> = (props): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.onChangePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(props.page);
  }, [props.page]);

  return (
    <div className="ed-pagination">
      <ItemArray count={props.numPages}>
        {(_, index) => (
          <Button mini bordered={index + 1 != currentPage} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Button>
        )}
      </ItemArray>
    </div>
  );
};

export interface PaginationProps {
  page: number;
  numPages: number;
  onChangePage: (page: number) => void;
}

export default Pagination;
