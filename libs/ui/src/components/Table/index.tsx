import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import './Table.scss';
import {
  AutoSizer,
  Column,
  ColumnProps,
  ColumnSizer,
  InfiniteLoader,
  RowMouseEventHandlerParams,
  SortDirection,
  Table as VTable,
  TableCellProps,
  TableCellRenderer,
  TableHeaderRenderer,
} from 'react-virtualized';
import { PaginationMetaData } from '@doorward/common/dtos/response/base.response';
import Tools from '@doorward/common/utils/Tools';
import translate from '@doorward/common/lang/translate';
import Dropdown from '@doorward/ui/components/Dropdown';
import Icon from '@doorward/ui/components/Icon';
import useResponsiveness, { DisplayDeviceType } from '@doorward/ui/hooks/useResponsiveness';

function Table<T, Columns extends ColumnProperties<T>>({
  sortable = true,
  ...props
}: TableProps<T, Columns>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);
  const [sortInfo, setSortInfo] = useState();
  const [_data, _setData] = useState([]);
  const [columns, setColumns] = useState<ColumnProperties<T>>({});
  const [displayDevice] = useResponsiveness();

  useEffect(() => {
    if (props.columns) {
      const _columns: ColumnProperties<T> = { ...props.columns };

      if (props.actionMenu) {
        _columns.action = {
          title: translate('actionMenuTitle'),
          minWidth: 60,
          maxWidth: 80,
          cellRenderer: (cellProps) => {
            return (
              <Dropdown preventClickPropagation>
                <Icon icon={'more_horiz'} />
                {props.actionMenu(cellProps)}
              </Dropdown>
            );
          },
        };
      }

      Object.keys(_columns).forEach((columnKey) => {
        if (_columns[columnKey].minDisplay && displayDevice < _columns[columnKey].minDisplay) {
          delete _columns[columnKey];
        }
      });

      setColumns(_columns);
    }
  }, [props.columns, props.actionMenu, displayDevice]);

  useEffect(() => {
    let _updated = [...data];
    if (sortInfo) {
      _updated = _updated.sort((a, b) => {
        const sortFunction =
          columns?.[sortInfo.sortBy]?.sortFunction || ((a, b) => a[sortInfo.sortBy] > b[sortInfo.sortBy]);

        return (sortFunction(a, b) ? 1 : -1) * (sortInfo.sortDirection === SortDirection.DESC ? -1 : 1);
      });
    }

    _setData(_updated);
  }, [data, sortInfo]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  const cellRenderer: TableCellRenderer = (cellProps) => {
    if (columns?.[cellProps.dataKey]?.cellRenderer) {
      return columns[cellProps.dataKey].cellRenderer(cellProps);
    }
    return Tools.str(cellProps.cellData);
  };

  const headerRenderer: TableHeaderRenderer = (cellProps) => {
    if (columns?.[cellProps.dataKey]?.headerRenderer) {
      return columns[cellProps.dataKey].headerRenderer(cellProps);
    }
    return (
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {Tools.str(cellProps.label)}
      </span>
    );
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
      style={{ width: '100%', height: props.height || '100%', maxHeight: props.height || 1000 }}
    >
      <InfiniteLoader
        loadMoreRows={() => {
          if (props.pagination && props.loadMore) {
            if (props.pagination.page < props.pagination.totalPages) {
              return props.loadMore(props.pagination.page + 1);
            }
          }
        }}
        isRowLoaded={({ index }) => !!_data[index]}
        rowCount={1000000}
      >
        {({ onRowsRendered }) => (
          <AutoSizer>
            {({ width, height }) => (
              <ColumnSizer width={width} columnCount={Object.keys(columns).length}>
                {({ adjustedWidth }) => (
                  <VTable
                    rowCount={_data.length}
                    rowHeight={props.rowHeight || 40}
                    onRowsRendered={onRowsRendered}
                    height={height}
                    rowGetter={({ index }) => _data[index]}
                    onRowClick={props.onRowClick}
                    sort={setSortInfo}
                    sortBy={sortInfo?.sortBy}
                    sortDirection={sortInfo?.sortDirection}
                    headerHeight={props.headerHeight || 40}
                    width={width}
                  >
                    {Object.keys(columns).map((columnKey) => (
                      <Column
                        {...columns[columnKey]}
                        headerRenderer={headerRenderer}
                        width={columns[columnKey].width || adjustedWidth}
                        dataKey={columnKey}
                        label={columns[columnKey].title}
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

export type OnRowClick = (info: RowMouseEventHandlerParams) => void;

export type FilterTable<T> = (data: Array<T>, text: string) => Array<T>;

export type ActionMenu = (props: TableCellProps) => JSX.Element;

/*export type ActionMenu<T> = {
  data : any;
  minDisplay?: DisplayDeviceType;
}*/

export type ColumnProperties<T> = Record<
  string,
  {
    sortFunction?: (a: T, b: T) => boolean;
    title: string;
    cellRenderer?: TableCellRenderer;
    headerRenderer?: TableHeaderRenderer;
    minDisplay?: DisplayDeviceType;
  } & Partial<ColumnProps>
>;

export interface TableProps<T, Columns extends ColumnProperties<T> = any> {
  onRowClick?: OnRowClick;
  className?: string;
  data: Array<T>;
  height?: number;
  rowHeight?: number;
  headerHeight?: number;
  pagination?: PaginationMetaData;
  loadMore?: (page: number) => Promise<any>;
  columns: Columns;
  actionMenu?: ActionMenu;

  filter?: FilterTable<T>;
  searchText?: string;
  noPanel?: boolean;
  children?: ReactNode;
  condensed?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  selected?: Record<string | number, boolean>;
  toggleSelection?: (item: T) => boolean;
}

export default Table;
