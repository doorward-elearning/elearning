import React, { useContext } from 'react';
import { TableContext } from './index';

const TableHeader: React.FunctionComponent<TableHeaderProps> = props => {
  const table = useContext(TableContext);

  return (
    <thead>
      <tr>
        {Object.keys(table.columns).map(columnKey => {
          return <th key={columnKey}>{table.columns[columnKey]}</th>;
        })}
      </tr>
    </thead>
  );
};

export interface TableHeaderProps {}

export default TableHeader;
