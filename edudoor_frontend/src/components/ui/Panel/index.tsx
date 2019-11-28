import React, { CSSProperties, MouseEventHandler } from 'react';
import './Panel.scss';
import classNames from 'classnames';

const Panel: React.FunctionComponent<PanelProps> = props => {
  const className = classNames({
    'ed-panel': true,
    [props.className || '']: true,
    plain: props.plain,
    noBackground: props.noBackground,
  });
  return (
    <div className={className} onClick={props.onClick} style={props.style}>
      {props.children}
    </div>
  );
};

export interface PanelProps {
  className?: string;
  onClick?: MouseEventHandler;
  plain?: boolean;
  noBackground?: boolean;
  style?: CSSProperties;
}

export default Panel;
