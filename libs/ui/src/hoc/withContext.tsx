import * as React from 'react';

function withContext<Q>(
  Component: React.FunctionComponent<Q>,
  initialProps: { [x in keyof Q]?: Q[x] }
): {
  Context: React.FunctionComponent<{ [x in keyof Q]?: Q[x] }>;
  ContextConsumer: React.FunctionComponent<Q>;
} {
  const Context = React.createContext<{ [x in keyof Q]?: Q[x] }>(initialProps);

  const ContextConsumer: React.FunctionComponent<Q> = props => {
    return <Context.Consumer>{contextProps => <Component {...props} {...contextProps} />}</Context.Consumer>;
  };

  return {
    Context: props => <Context.Provider value={props}>{props.children}</Context.Provider>,
    ContextConsumer,
  };
}

export default withContext;
