import React, { useContext } from 'react';
import { TableContext } from './index';

const TableHeader: React.FunctionComponent<TableHeaderProps> = props => {
  const table = useContext(TableContext);
  table.columns = props.columns;

  return (
    <thead>
      <tr>
        {Object.keys(props.columns).map(columnKey => {
          return <th key={columnKey}>{props.columns[columnKey]}</th>;
        })}
      </tr>
    </thead>
  );
};

export interface TableHeaderProps {
  columns: { [name: string]: string };
}

export default TableHeader;
