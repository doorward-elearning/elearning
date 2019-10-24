import React from 'react';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import './WebComponentItems.scss';

function WebComponentItems<T>(props: WebComponentItemsProps<T>): JSX.Element {
  if (props.list && props.list.length) {
    return <React.Fragment>{props.children(props.list)}</React.Fragment>;
  } else {
    if (props.loading) {
      return (
        props.loader || (
          <div className="web-component__spinner">
            <Spinner />
          </div>
        )
      );
    } else {
      return (
        props.empty || (
          <div className="web-component__empty">
            <Empty />
          </div>
        )
      );
    }
  }
}

export interface WebComponentItemsProps<T> {
  loader?: JSX.Element;
  empty?: JSX.Element;
  emptyMessage?: string;
  list: Array<T> | null | undefined;
  loading: boolean;
  children: (list: Array<T>) => JSX.Element;
}

export default WebComponentItems;
