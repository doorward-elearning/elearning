import React, { CSSProperties } from 'react';
import './Row.scss';

const Row: React.FunctionComponent<RowProps> = props => {
  return (
    <div className={`ed-row ${props.className || ''}`} style={props.style}>
      {props.children}
    </div>
  );
};

export interface RowProps {
  style?: CSSProperties;
  className?: string;
}

export default Row;
