import React from 'react';
import classNames from 'classnames';
import './Grid.scss';

const Grid: React.FunctionComponent<GridProps> = props => {
  const className = classNames({
    'ed-grid': true,
    [`columns-${props.columns}`]: true,
  });
  return <div className={className}>{props.children}</div>;
};

export interface GridProps {
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto';
}

export default Grid;
