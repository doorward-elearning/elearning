import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import './Table.scss';
import classNames from 'classnames';

function Table<T, K>(props: TableProps<T, K>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);
  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    setData(props.data);
    setFiltered(props.data);
  }, [data]);

  useEffect(() => {
    if (props.filter) {
      setFiltered(props.filter([...data], props.searchText || ''));
    }
  }, [props.searchText]);

  return (
    <div
      className={classNames({
        'ed-table': true,
        [props.className || '']: true,
      })}
    >
      <table>
        <TableHeader columns={props.columns} />
        <TableBody getCell={props.getCell} data={filtered} onRowClick={props.onRowClick} columns={props.columns} />
      </table>
    </div>
  );
}

function renderRow<T, K>(item: T, index: number, props: TableBodyProps<T, K>): JSX.Element {
  const onRowClick = (): void => {
    if (props.onRowClick) {
      props.onRowClick(item, index);
    }
  };
  return (
    <tr key={index} onClick={onRowClick}>
      {Object.keys(props.columns).map(columnKey => {
        return <td key={columnKey}>{props.getCell(item, index, columnKey as keyof K)}</td>;
      })}
    </tr>
  );
}

function TableBody<T, K>(props: TableBodyProps<T, K>): JSX.Element {
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
function TableHeader<T>(props: TableHeaderProps<T>): JSX.Element {
  return (
    <thead>
      <tr>
        {(Object.keys(props.columns) as Array<keyof T>).map((columnKey, index) => {
          return <th key={columnKey + ' ' + index}>{props.columns[columnKey]}</th>;
        })}
      </tr>
    </thead>
  );
}

export interface TableHeaderProps<K> {
  columns: K;
}

export interface TableBodyProps<T, K> {
  onRowClick?: (row: T, index: number) => void;
  getCell: (row: T, index: number, column: keyof K) => JSX.Element | string;
  data: Array<T>;
  columns: K;
}

export interface TableProps<T, K> extends PropsWithChildren<any> {
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  data: Array<T>;
  getCell: (row: T, index: number, column: keyof K) => JSX.Element | string;
  columns: K;
  filter?: (data: Array<T>, text: string) => Array<T>;
  searchText?: string;
}

export default Table;
