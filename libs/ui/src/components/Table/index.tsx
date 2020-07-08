import React, { MutableRefObject, PropsWithChildren, useEffect, useRef, useState } from 'react';
import './Table.scss';
import classNames from 'classnames';
import Panel from '../Panel';
import Tools from '@doorward/common/utils/Tools';
import Icon from '../Icon';
import Dropdown from '@doorward/ui/components/Dropdown';

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

function renderRow<T, K extends TableColumns>(
  item: T,
  index: number,
  props: TableProps<T, K>,
  actionMenuRef: MutableRefObject<any>
): JSX.Element {
  const onRowClick = (): void => {
    if (props.onRowClick) {
      props.onRowClick(item, index);
    }
  };

  const defaultRenderer = columnKey => {
    return <span>{Tools.str(item[columnKey as keyof typeof item])}</span>;
  };

  const propsRenderCell = (columnKey: any): JSX.Element | string => {
    const result = props.getCell && props.getCell(item, index);

    if (result && result[columnKey]) {
      return result[columnKey];
    }
    return defaultRenderer(columnKey);
  };

  return (
    <tr
      key={index}
      onClick={e => {
        if (actionMenuRef.current) {
          if (!actionMenuRef.current.contains(e.target)) {
            onRowClick();
          }
        } else {
          onRowClick();
        }
      }}
    >
      {Object.keys(props.columns).map(columnKey => {
        return <td key={columnKey}>{propsRenderCell(columnKey)}</td>;
      })}
      {props.actionMenu && (
        <td className="menu" ref={actionMenuRef}>
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
  const actionMenuRef = useRef();
  return (
    <tbody>
      {props.data.map(
        (item: T, index: number): JSX.Element => {
          return renderRow(item, index, props, actionMenuRef);
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

export interface TableColumns {
  [name: string]: string;
}
export interface TableHeaderProps<K extends TableColumns> {
  columns: K;
}

export type CellRenderer<T, K> = (row: T, index: number, column: keyof K) => JSX.Element | string;

export type OnRowClick<T> = (row: T, index: number) => void;

export type GetCell<T, K extends TableColumns> = (
  row: T,
  index: number
) => { [name in keyof K]?: JSX.Element | string };

export type ActionMenu<T> = (row: T) => JSX.Element;

export type FilterTable<T> = (data: Array<T>, text: string) => Array<T>;

export interface TableProps<T, K extends TableColumns> extends PropsWithChildren<any> {
  onRowClick?: OnRowClick<T>;
  className?: string;
  data: Array<T>;
  getCell?: GetCell<T, K>;
  columns: K;
  filter?: FilterTable<T>;
  searchText?: string;
  noPanel?: boolean;
  actionMenu?: ActionMenu<T>;
}

export default Table;
