import React, { FunctionComponent, useEffect } from 'react';
import { ActionCreator, WebComponentState } from '../../../reducers/reducers';
import { State } from '../../../store';
import useAction from '../../../hooks/useActions';
import { useSelector } from 'react-redux';
import WebComponent from './index';

function SimpleWebComponent<
  T extends WebComponentState<any>,
  S extends ActionCreator,
  U extends (data: Data<T>) => any,
  P extends SimpleWebConsumer<any, ApiData<U, T>>,
  R = ChildProps<P>
>(props: SimpleWebComponentProps<T, S, U>): (consumer: P) => React.FunctionComponent<R> {
  return (consumer: P): FunctionComponent<R> => {
    return (childProps): JSX.Element => {
      const action = useAction(props.action);
      useEffect(() => {
        const params = props.params || [];
        action(...(params as Parameters<S>));
      }, []);
      const state = useSelector(props.selector);
      return (
        <WebComponent data={props.data(state.data)} loading={state.fetching}>
          {(data): JSX.Element => <React.Fragment>{consumer(data)(childProps)}</React.Fragment>}
        </WebComponent>
      );
    };
  };
}

type Data<T> = T extends WebComponentState<infer U> ? U : T;

type ApiData<T, R> = T extends (data: Data<R>) => infer U ? U : T;

type ChildProps<T> = T extends SimpleWebConsumer<infer U, any> ? U : T;

export interface SimpleWebComponentProps<
  T extends WebComponentState<any>,
  S extends ActionCreator,
  U extends (data: Data<T>) => any
> {
  action: S;
  selector: (state: State) => T;
  params?: Parameters<S>;
  data: U;
}

export type SimpleWebConsumer<T, S> = (data: S) => FunctionComponent<T>;

export default SimpleWebComponent;
