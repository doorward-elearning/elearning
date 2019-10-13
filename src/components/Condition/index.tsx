import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './Condition.scss';

const Condition: React.FunctionComponent<ConditionProps> = ({ condition, children }): ReactElement => {
  const classes = classNames({
    'ed-condition': true,
    isTrue: condition,
  });
  return (
    <div className={classes}>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </div>
  );
};

export interface ConditionProps {
  condition: boolean;
  children: readonly [ReactElement, ReactElement];
}

export default Condition;
