import React, { useContext } from 'react';
import { TableContext } from './index';

function renderRow<T, K>(item: T, index: number, props: TableBodyProps<T, K>): JSX.Element {
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
        return <td key={columnKey}>{props.getCell(item, index, columnKey as keyof K)}</td>;
      })}
    </tr>
  );
}

function TableBody<T, K>(props: TableBodyProps<T, K>): JSX.Element {
  const table = useContext(TableContext);
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

export interface TableBodyProps<T, K> {
  data: Array<T>;
  getCell: (row: T, index: number, column: keyof K) => JSX.Element | string;
  onRowClick?: (row: T, index: number) => void;
}

export default TableBody;
