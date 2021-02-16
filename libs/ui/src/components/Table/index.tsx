import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import './Table.scss';
import {
  AutoSizer,
  Column,
  ColumnSizer,
  InfiniteLoader,
  Table as VTable,
  TableCellProps,
  TableCellRenderer,
} from 'react-virtualized';
import { PaginationMetaData } from '@doorward/common/dtos/response/base.response';
import Tools from '@doorward/common/utils/Tools';

function Table<T extends { id: string | number }, K extends TableColumns>({
  sortable = true,
  ...props
}: TableProps<T, K>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  const cellRenderer: TableCellRenderer = (cellProps) => {
    if (props.getCell?.[cellProps.dataKey]) {
      return props.getCell[cellProps.dataKey](cellProps);
    }
    return Tools.str(cellProps.cellData);
  };

  return (
    <div
      className={classNames({
        'ed-table': true,
        'ed-panel': !props.noPanel,
        [props.className || '']: true,
        condensed: !!props.condensed,
        sortable: !!sortable,
        selectable: !!props.selectable,
      })}
      style={{ width: '100%', height: props.height || 'auto', maxHeight: props.height || 1000 }}
    >
      <InfiniteLoader
        loadMoreRows={() => {
          if (props.pagination && props.loadMore) {
            if (props.pagination.page < props.pagination.totalPages) {
              return props.loadMore(props.pagination.page + 1);
            }
          }
        }}
        isRowLoaded={({ index }) => !!data[index]}
        rowCount={1000000}
      >
        {({ onRowsRendered }) => (
          <AutoSizer>
            {({ width, height }) => (
              <ColumnSizer width={width} columnCount={Object.keys(props.columns).length}>
                {({ adjustedWidth }) => (
                  <VTable
                    rowCount={data.length}
                    rowHeight={props.rowHeight || 40}
                    onRowsRendered={onRowsRendered}
                    height={height}
                    rowGetter={({ index }) => data[index]}
                    headerHeight={props.headerHeight || 40}
                    width={width}
                  >
                    {Object.keys(props.columns).map((columnKey) => (
                      <Column
                        width={adjustedWidth}
                        dataKey={columnKey}
                        label={props.columns[columnKey]}
                        cellRenderer={cellRenderer}
                      />
                    ))}
                  </VTable>
                )}
              </ColumnSizer>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}

export interface TableColumns {
  [name: string]: string;
}

export type OnRowClick<T> = (row: T, index: number) => void;

export type CellRenderer<K extends TableColumns> = {
  [name in keyof K]?: TableCellRenderer;
};

export type ActionMenu<T> = (row: T) => JSX.Element;

export type FilterTable<T> = (data: Array<T>, text: string) => Array<T>;

export interface TableProps<T extends { id: string | number }, K extends TableColumns> {
  onRowClick?: OnRowClick<T>;
  className?: string;
  data: Array<T>;
  height?: number;
  rowHeight?: number;
  headerHeight?: number;
  pagination?: PaginationMetaData;
  loadMore?: (page: number) => Promise<any>;

  getCell?: CellRenderer<K>;
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
  sortColumn?: Partial<Record<keyof K, (a: T, b: T) => boolean>>;
}

export default Table;
