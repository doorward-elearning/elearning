import React, { MouseEventHandler } from 'react';
import './Panel.scss';

const Panel: React.FunctionComponent<PanelProps> = props => {
  return (
    <div className={`ed-panel ${props.className || ''}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export interface PanelProps {
  className?: string;
  onClick?: MouseEventHandler;
}

export default Panel;
