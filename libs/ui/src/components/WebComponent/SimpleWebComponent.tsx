import React, { useEffect, useState } from 'react';
import WebComponent, { WebComponentProps } from './index';
import useAction from '../../hooks/useActions';
import { ApiActionCreator, WebComponentState } from '@doorward/api-actions/types';

function SimpleWebComponent<
  T extends WebComponentState<any>,
  S extends ApiActionCreator,
  U extends (data: Data<T>) => any
>(props: Omit<SimpleWebComponentProps<T, S, U>, 'loading' | 'data'>): JSX.Element {
  const action = useAction(props.action);
  const [params, setParams] = useState([]);

  useEffect(() => {
    if (JSON.stringify(props.params) !== JSON.stringify(params)) {
      setParams(props.params || []);
    }
  }, [props.params]);

  useEffect(() => {
    action(...(params as Parameters<S>));
  }, [params]);

  return (
    <WebComponent {...props} data={props.state.data} loading={props.state.fetching}>
      {(data): JSX.Element => <React.Fragment>{props.children(props.dataSelector(data))}</React.Fragment>}
    </WebComponent>
  );
}

type Data<T> = T extends WebComponentState<infer U> ? U : T;

type ApiData<T, R> = T extends (data: Data<R>) => infer U ? U : T;

export interface SimpleWebComponentProps<
  T extends WebComponentState<any>,
  S extends ApiActionCreator,
  U extends (data: Data<T>) => any
> extends WebComponentProps<ApiData<U, T>> {
  action: S;
  state: T;
  params?: Parameters<S>;
  dataSelector: U;
}

export type SimpleWebConsumer<S, T> = (props: S) => (data: T) => JSX.Element;

export default SimpleWebComponent;
