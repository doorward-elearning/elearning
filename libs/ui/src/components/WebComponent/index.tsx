import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Empty, { EmptyProps } from '../Empty';
import './WebComponent.scss';
import classNames from 'classnames';
import NotFound from '../NotFound';
import { PageProgressContext } from '../PageProgress';
import translate from '@doorward/common/lang/translate';

function WebComponent<T>({ children, ...props }: WebComponentProps<T>): JSX.Element {
  const pageProgress = useContext(PageProgressContext);
  const [hasItems, setHasItems] = useState();
  useEffect(() => {
    let hasData = false;
    if (props.data instanceof Array) {
      const list = props.data as Array<any>;
      hasData = !!list?.length;
    } else {
      hasData = !!props.data;
    }
    hasData = props.hasData ? props.hasData(props.data) : hasData;

    setHasItems(hasData);
  }, [props.data, props.hasData]);

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
          refreshing: props.loading && props.showRefreshingProgress,
          inline: props.inline,
        })}
      >
        <div className="web-component__refreshing">
          <div>{loader}</div>
        </div>
        <React.Fragment>{children(props.data)}</React.Fragment>
      </div>
    );
  } else if (props.errors?.statusCode === 404) {
    return (
      <div className="web-component">
        <NotFound
          title={translate('notFound')}
          buttonText={translate('dashboard')}
          message={translate('thisResourceDoesNotExist')}
        />
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
  hasData?: (data: T) => boolean;
  modelName?: string;
  showRefreshingProgress?: boolean;
}

export default WebComponent;
