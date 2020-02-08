import React, { PropsWithChildren, useEffect, useState } from 'react';
import './Table.scss';
import classNames from 'classnames';
import Panel from '../Panel';
import Tools from '@edudoor/common/utils/Tools';
import Icon from '../Icon';
import Dropdown from '@edudoor/ui/components/Dropdown';

function Table<T, K extends TableColumns>(props: TableProps<T, K>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);
  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    setData(props.data);
    setFiltered(props.data);
  }, [props.data, data]);

  useEffect(() => {
    if (props.filter) {
      setFiltered(props.filter([...data], props.searchText || ''));
    }
  }, [props.searchText]);

  const Container = props.noPanel ? React.Fragment : Panel;
  return (
    <div
      className={classNames({
        'ed-table': true,
        [props.className || '']: true,
      })}
    >
      <Container>
        <table>
          <TableHeader columns={props.columns} />
          <TableBody {...props} />
        </table>
      </Container>
    </div>
  );
}

function renderRow<T, K extends TableColumns>(item: T, index: number, props: TableProps<T, K>): JSX.Element {
  const onRowClick = (): void => {
    if (props.onRowClick) {
      props.onRowClick(item, index);
    }
  };

  const defaultRenderer = (item, index, columnKey) => {
    return <span>{Tools.str(item[columnKey as keyof typeof item])}</span>;
  };

  return (
    <tr key={index} onClick={onRowClick}>
      {Object.keys(props.columns).map(columnKey => {
        return (
          <td key={columnKey}>
            {props.getCell
              ? props.getCell(item, index, columnKey as keyof K, () => {
                  return defaultRenderer(item, index, columnKey);
                })
              : defaultRenderer(item, index, columnKey)}
          </td>
        );
      })}
      {props.actionMenu && (
        <td className="menu">
          <Dropdown positionX="right">
            <Icon icon="more_vert" />
            {props.actionMenu(item)}
          </Dropdown>
        </td>
      )}
    </tr>
  );
}

function TableBody<T, K extends TableColumns>(props: TableProps<T, K>): JSX.Element {
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
function TableHeader<T extends TableColumns>(props: TableHeaderProps<T>): JSX.Element {
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

export type TableColumns = {
  [name: string]: string;
};
export interface TableHeaderProps<K extends TableColumns> {
  columns: K;
}

export type CellRenderer<T, K> = (row: T, index: number, column: keyof K) => JSX.Element | string;

export interface TableProps<T, K extends TableColumns> extends PropsWithChildren<any> {
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  data: Array<T>;
  getCell?: (row: T, index: number, column: keyof K, defaultRenderer: () => JSX.Element) => JSX.Element | string;
  columns: K;
  filter?: (data: Array<T>, text: string) => Array<T>;
  searchText?: string;
  noPanel?: boolean;
  actionMenu?: (row: T) => JSX.Element;
}

export default Table;
