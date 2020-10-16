import React from 'react';
import './HeaderGrid.scss';

const HeaderGrid: React.FunctionComponent<HeaderGridProps> = (props): JSX.Element => {
  return <div className="ed-header-grid">{props.children}</div>;
};

export interface HeaderGridProps {}

export default HeaderGrid;
