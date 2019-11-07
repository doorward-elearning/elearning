import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Empty, { EmptyProps } from '../Empty';
import './WebComponent.scss';
import classNames from 'classnames';

function WebComponent<T>(props: WebComponentItemsProps<T>): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  let hasItems = !!props.data;
  if (props.data instanceof Array) {
    const list = props.data as Array<any>;
    hasItems = !!list.length;
  }

  useEffect(() => {
    if (hasItems && props.data) {
      setRefreshing(props.loading);
    }
  }, [props]);
  if (hasItems && props.data) {
    return (
      <div
        className={classNames({
          'web-component__content': true,
          refreshing,
        })}
      >
        <React.Fragment>{props.children(props.data)}</React.Fragment>
      </div>
    );
  } else {
    return (
      <div
        className={classNames({
          'web-component': true,
          loading: props.loading,
        })}
      >
        <div className="web-component__spinner">{props.loader || <Spinner height={30} width={30} />}</div>
        <div className="web-component__empty">{props.empty || <Empty {...props} />}</div>
      </div>
    );
  }
}

export interface WebComponentItemsProps<T> extends EmptyProps {
  loader?: JSX.Element;
  empty?: JSX.Element;
  emptyMessage?: string;
  data: T | undefined;
  loading: boolean;
  children: (data: T) => JSX.Element;
}

export default WebComponent;
