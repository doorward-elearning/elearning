import React from 'react';
import classNames from 'classnames';
import './Grid.scss';
import { AlignContentProperty, AlignItemsProperty, JustifyContentProperty, JustifyItemsProperty } from 'csstype';

const Grid: React.FunctionComponent<GridProps> = ({ columns, children, ...props }) => {
  const className = classNames({
    'ed-grid': true,
    [`columns-${columns}`]: true,
  });
  return (
    <div className={className} style={{ ...props }}>
      {children}
    </div>
  );
};

export interface GridProps {
  columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto';
  alignItems?: AlignItemsProperty;
  alignContent?: AlignContentProperty;
  justifyItems?: JustifyItemsProperty;
  justifyContent?: JustifyContentProperty;
}

export default Grid;
