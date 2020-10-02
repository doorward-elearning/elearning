import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import './Table.scss';
import classNames from 'classnames';
import Panel from '../Panel';
import Tools from '@doorward/common/utils/Tools';
import Icon from '../Icon';
import Dropdown from '@doorward/ui/components/Dropdown';
import { BasicCheckbox } from '../Input/Checkbox';

const compare = (a, b, ascending = false) => {
  let comparison = 0;
  if (a > b) {
    comparison = 1;
  } else {
    comparison = -1;
  }

  return comparison * (ascending ? 1 : -1);
};

function Table<T extends { id: string | number }, K extends TableColumns>({
  sortable = true,
  ...props
}: TableProps<T, K>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);
  const [manipulated, setManipulated] = useState(data);
  const [selected, setSelected] = useState(props.selected || {});
  const [sortColumn, setSortColumn] = useState({ key: '', descending: true });

  useEffect(() => {
    if (sortColumn.key) {
      setManipulated(data.sort((a, b) => compare(a[sortColumn.key], b[sortColumn.key], sortColumn.descending)));
    }
  }, [sortColumn]);

  useEffect(() => {
    setData(props.data);
    setManipulated(props.data);
  }, [props.data, data]);

  useEffect(() => {
    if (props.filter) {
      setManipulated(props.filter([...data], props.searchText || ''));
    }
  }, [props.searchText]);

  const Container = props.noPanel ? React.Fragment : Panel;
  return (
    <div
      className={classNames({
        'ed-table': true,
        [props.className || '']: true,
        condensed: !!props.condensed,
        sortable: !!sortable,
        selectable: !!props.selectable,
      })}
    >
      <Container>
        <table>
          <TableHeader
            columns={props.columns}
            allSelected={!data.find((x) => !selected[x.id])}
            toggleSelection={(allSelected) => {
              setSelected(data.reduce((acc, cur) => ({ ...acc, [cur.id]: !allSelected }), {}));
              return !allSelected;
            }}
            onColumnClick={(key) => {
              if (sortable) {
                setSortColumn({
                  key: key + '',
                  descending: !sortColumn.descending,
                });
              }
            }}
            sortColumn={sortColumn}
          />
          <TableBody
            {...props}
            selected={selected}
            toggleSelection={(item) => {
              setSelected({
                ...selected,
                [item.id]: !selected[item.id],
              });
              return !selected[item.id];
            }}
            data={manipulated}
          />
        </table>
      </Container>
    </div>
  );
}

function renderRow<T extends { id: number | string }, K extends TableColumns>(
  item: T,
  index: number,
  props: TableProps<T, K>,
  actionMenuRef: MutableRefObject<any>,
  selected: Record<number | string, boolean>,
  toggleSelection: (item: T) => boolean
): JSX.Element {
  const onRowClick = (): void => {
    if (props.onRowClick) {
      props.onRowClick(item, index);
    }
  };

  const defaultRenderer = (columnKey) => {
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
    <tr key={index}>
      <td>
        <BasicCheckbox theme="primary" value={props.selected[item.id]} onChange={() => toggleSelection(item)} />
      </td>
      {Object.keys(props.columns).map((columnKey) => {
        return (
          <td
            key={columnKey}
            onClick={(e) => {
              if (actionMenuRef.current) {
                if (!actionMenuRef.current.contains(e.target)) {
                  onRowClick();
                }
              } else {
                onRowClick();
              }
            }}
          >
            {propsRenderCell(columnKey)}
          </td>
        );
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

function TableBody<T extends { id: string | number }, K extends TableColumns>(props: TableProps<T, K>): JSX.Element {
  const actionMenuRef = useRef();
  return (
    <tbody>
      {props.data.map(
        (item: T, index: number): JSX.Element => {
          return renderRow(item, index, props, actionMenuRef, props.selected, props.toggleSelection);
        }
      )}
    </tbody>
  );
}
function TableHeader<T extends TableColumns>(props: TableHeaderProps<T>): JSX.Element {
  return (
    <thead>
      <tr>
        <th>
          <BasicCheckbox
            theme={'primary'}
            value={props.allSelected}
            onChange={() => props.toggleSelection(props.allSelected)}
          />
        </th>
        {(Object.keys(props.columns) as Array<keyof T>).map((columnKey, index) => {
          return (
            <th
              onClick={() => props.onColumnClick(columnKey)}
              key={columnKey + ' ' + index}
              className={classNames({
                sorting: props?.sortColumn?.key === columnKey,
              })}
            >
              <div className="content">
                <span>{props.columns[columnKey]}</span>
                {props.sortColumn?.key === columnKey && (
                  <span className="sort-icon">
                    <Icon icon={props.sortColumn?.descending ? 'arrow_downward' : 'arrow_upward'} />
                  </span>
                )}
              </div>
            </th>
          );
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
  allSelected: boolean;
  toggleSelection: (allSelected: boolean) => boolean;
  onColumnClick: (key: keyof K) => void;
  sortColumn?: { key: keyof K; descending: boolean };
}

export type CellRenderer<T, K> = (row: T, index: number, column: keyof K) => JSX.Element | string;

export type OnRowClick<T> = (row: T, index: number) => void;

export type GetCell<T, K extends TableColumns> = (
  row: T,
  index: number
) => { [name in keyof K]?: JSX.Element | string };

export type ActionMenu<T> = (row: T) => JSX.Element;

export type FilterTable<T> = (data: Array<T>, text: string) => Array<T>;

export interface TableProps<T extends { id: string | number }, K extends TableColumns> {
  onRowClick?: OnRowClick<T>;
  className?: string;
  data: Array<T>;
  getCell?: GetCell<T, K>;
  columns: K;
  filter?: FilterTable<T>;
  searchText?: string;
  noPanel?: boolean;
  actionMenu?: ActionMenu<T>;
  children?: ReactNode;
  condensed?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  selected?: Record<string | number, boolean>;
  toggleSelection?: (item: T) => boolean;
}

export default Table;
