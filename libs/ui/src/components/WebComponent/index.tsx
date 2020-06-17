import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Empty, { EmptyProps } from '../Empty';
import './WebComponent.scss';
import classNames from 'classnames';
import NotFound from '../NotFound';
import { PageProgressContext } from '../PageProgress';

function WebComponent<T>(props: WebComponentProps<T>): JSX.Element {
  const pageProgress = useContext(PageProgressContext);
  let hasItems = !!props.data;
  if (props.data instanceof Array) {
    const list = props.data as Array<any>;
    hasItems = !!list.length;
  }

  useEffect(() => {
    return (): void => {
      pageProgress.setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (props.loading) {
      if (!hasItems || !props.data) {
        pageProgress.setLoading(true);
      }
    } else {
      pageProgress.setLoading(false);
    }
  }, [props.loading]);

  const loader = props.loader === undefined ? <Spinner height={30} width={30} /> : props.loader;
  const empty =
    props.empty === undefined ? (
      <Empty {...props} message={props.emptyMessage} modelName={props.modelName} />
    ) : (
      props.empty
    );

  if (hasItems && props.data) {
    return (
      <div
        className={classNames({
          'web-component__content': true,
          refreshing: props.loading,
          inline: props.inline,
        })}
      >
        <div className="web-component__refreshing">
          <div>{loader}</div>
        </div>
        <React.Fragment>{props.children(props.data)}</React.Fragment>
      </div>
    );
  } else if (props.errors?.statusCode === 404) {
    return (
      <div className="web-component">
        <NotFound title="Not Found" buttonText="Dashboard" message="The resource does not exist." />
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
        <div className="web-component__spinner">{loader}</div>
        <div className="web-component__empty">{empty}</div>
      </div>
    );
  }
}

export interface WebComponentProps<T> extends EmptyProps {
  loader?: JSX.Element | null;
  empty?: JSX.Element | null;
  emptyMessage?: string;
  data: T | undefined;
  loading: boolean;
  children: (data: T) => JSX.Element;
  showPageProgress?: boolean;
  inline?: boolean;
  errors?: any;
  modelName?: string;
  showRefreshingProgress?: boolean;
}

export default WebComponent;
