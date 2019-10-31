import React from 'react';
import Spinner from '../Spinner';
import Empty from '../Empty';
import './WebComponent.scss';

function WebComponent<T>(props: WebComponentItemsProps<T>): JSX.Element {
  let hasItems = !!props.data;
  if (props.data instanceof Array) {
    const list = props.data as Array<any>;
    hasItems = !!list.length;
  }
  if (hasItems && props.data) {
    return <React.Fragment>{props.children(props.data)}</React.Fragment>;
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
  data: T | undefined;
  loading: boolean;
  children: (data: T) => JSX.Element;
}

export default WebComponent;
