import React, { useEffect } from 'react';
import { ActionCreator, WebComponentState } from '../../../reducers/reducers';
import { State } from '../../../store';
import useAction from '../../../hooks/useActions';
import { useSelector } from 'react-redux';
import WebComponent from './index';

function SimpleWebComponent<
  T extends WebComponentState<any>,
  S extends ActionCreator,
  U extends (data: Data<T>) => any
>(props: SimpleWebComponentProps<T, S, U>): JSX.Element {
  const action = useAction(props.action);
  useEffect(() => {
    const params = props.params || [];
    action(...(params as Parameters<S>));
  }, []);

  const state = useSelector(props.selector);

  return (
    <WebComponent data={props.data(state.data)} loading={state.fetching}>
      {props.children}
    </WebComponent>
  );
}

type Data<T> = T extends WebComponentState<infer U> ? U : T;

type ApiData<T, R> = T extends (data: Data<R>) => infer U ? U : T;

export interface SimpleWebComponentProps<
  T extends WebComponentState<any>,
  S extends ActionCreator,
  U extends (data: Data<T>) => any
> {
  action: S;
  selector: (state: State) => T;
  params?: Parameters<S>;
  children: (data: ApiData<U, T>) => JSX.Element;
  data: U;
}

export default SimpleWebComponent;
