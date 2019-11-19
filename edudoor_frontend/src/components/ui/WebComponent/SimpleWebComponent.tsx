import React, { FunctionComponent, useEffect } from 'react';
import { ActionCreator, WebComponentState } from '../../../reducers/reducers';
import { State } from '../../../store';
import useAction from '../../../hooks/useActions';
import { useSelector } from 'react-redux';
import WebComponent, { WebComponentProps } from './index';

function SimpleWebComponent<
  T extends WebComponentState<any>,
  S extends ActionCreator,
  U extends (data: Data<T>) => any
>(props: Omit<SimpleWebComponentProps<T, S, U>, 'loading' | 'data'>): JSX.Element {
  const action = useAction(props.action);
  useEffect(() => {
    const params = props.params || [];
    action(...(params as Parameters<S>));
  }, []);
  const state = useSelector(props.selector);
  return (
    <WebComponent {...props} data={props.dataSelector(state.data)} loading={state.fetching}>
      {(data): JSX.Element => <React.Fragment>{props.children(data)}</React.Fragment>}
    </WebComponent>
  );
}

type Data<T> = T extends WebComponentState<infer U> ? U : T;

type ApiData<T, R> = T extends (data: Data<R>) => infer U ? U : T;

export interface SimpleWebComponentProps<
  T extends WebComponentState<any>,
  S extends ActionCreator,
  U extends (data: Data<T>) => any
> extends WebComponentProps<ApiData<U, T>> {
  action: S;
  selector: (state: State) => T;
  params?: Parameters<S>;
  dataSelector: U;
}

export type SimpleWebConsumer<S, T> = (props: S) => (data: T) => JSX.Element;

export default SimpleWebComponent;
