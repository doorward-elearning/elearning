import React, { MouseEventHandler } from 'react';
import './Panel.scss';
import classNames from 'classnames';

const Panel: React.FunctionComponent<PanelProps> = props => {
  const className = classNames({
    'ed-panel': true,
    [props.className || '']: true,
    plain: props.plain,
  });
  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export interface PanelProps {
  className?: string;
  onClick?: MouseEventHandler;
  plain?: boolean;
}

export default Panel;
