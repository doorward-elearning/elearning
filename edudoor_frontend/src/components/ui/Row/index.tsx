import React, { CSSProperties } from 'react';
import './Row.scss';

const Row: React.FunctionComponent<RowProps> = props => {
  return (
    <div className="ed-row" style={props.style}>
      {props.children}
    </div>
  );
};

export interface RowProps {
  style?: CSSProperties;
}

export default Row;
