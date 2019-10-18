import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './Condition.scss';

const Condition: React.FunctionComponent<ConditionProps> = ({ condition, children }): ReactElement => {
  const classes = classNames({
    'ed-condition': true,
    isTrue: condition,
  });

  const c: any = children.constructor === Array ? children : [children];
  return (
    <div className={classes}>
      <div>{c[0]}</div>
      <div>{c[1]}</div>
    </div>
  );
};

export interface ConditionProps {
  condition: boolean;
  children: Array<ReactElement> | ReactElement;
}

export default Condition;
