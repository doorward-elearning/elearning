import React, { PropsWithChildren } from 'react';
import './Table.scss';
import classNames from 'classnames';

const initialValue = {
  columns: {},
  data: [],
};

export interface TableContextProps<T> {
  columns: { [name: string]: string };
  data: Array<T>;
}

export const TableContext = React.createContext<TableContextProps<any>>(initialValue);

function Table<T>(props: TableProps<T>): JSX.Element {
  return (
    <TableContext.Provider value={initialValue}>
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

export interface TableProps<T> extends PropsWithChildren<any> {
  className?: string;
}

export default Table;
