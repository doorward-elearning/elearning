import React, { ReactElement } from 'react';

const IfElse: React.FunctionComponent<ConditionProps> = ({ condition, children }): ReactElement => {
  const c: any = children.constructor === Array ? children : [children];
  return <React.Fragment>{condition ? c[0] : c[1]}</React.Fragment>;
};

export interface ConditionProps {
  condition: boolean;
  children: Array<ReactElement> | ReactElement;
}

export default IfElse;
