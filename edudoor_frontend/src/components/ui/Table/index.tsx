import React, { PropsWithChildren } from 'react';
import './Table.scss';
import classNames from 'classnames';

const initialValue = {
  columns: {},
  data: [],
};

export interface TableContextProps<T, K extends { [name: string]: string }> {
  columns: K;
  data: Array<T>;
}

export const TableContext = React.createContext<TableContextProps<any, any>>(initialValue);

function Table<T, K extends { [name: string]: string }>(props: TableProps<T, K>): JSX.Element {
  return (
    <TableContext.Provider
      value={{
        ...initialValue,
        columns: props.columns,
      }}
    >
      <div
        className={classNames({
          'ed-table': true,
          [props.className || '']: true,
        })}
      >
        <table>{props.children}</table>
      </div>
    </TableContext.Provider>
  );
}

export interface TableProps<T, K extends { [name: string]: string }> extends PropsWithChildren<any> {
  className?: string;
  columns: K;
}

export default Table;
