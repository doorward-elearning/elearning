import React, { useContext } from 'react';
import { TableContext } from './index';

function renderRow<T>(item: T, index: number, props: TableBodyProps<T>): JSX.Element {
  const table = useContext(TableContext);
  table.data[index] = item;

  const onRowClick = (): void => {
    if (props.onRowClick) {
      props.onRowClick(item, index);
    }
  };
  return (
    <tr key={index} onClick={onRowClick}>
      {Object.keys(table.columns).map(columnKey => {
        return <td key={columnKey}>{props.getCell(item, index, columnKey)}</td>;
      })}
    </tr>
  );
}

function TableBody<T>(props: TableBodyProps<T>): JSX.Element {
  return (
    <tbody>
      {props.data.map(
        (item: T, index: number): JSX.Element => {
          return renderRow(item, index, props);
        }
      )}
    </tbody>
  );
}

export interface TableBodyProps<T> {
  data: Array<T>;
  getCell: (row: T, index: number, column: any) => JSX.Element | string;
  onRowClick?: (row: T, index: number) => void;
}

export default TableBody;
