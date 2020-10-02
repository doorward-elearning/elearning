import React, { CSSProperties, FunctionComponent, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './Header.scss';

// eslint-disable-next-line react/jsx-key
const headers: Array<React.ReactElement> = [<h1 />, <h2 />, <h3 />, <h4 />, <h5 />, <h6 />];

const Header: FunctionComponent<HeaderProps> = ({
  size,
  children,
  onClick,
  className = '',
  style,
  thin,
  padded,
}): JSX.Element => {
  const classes = classNames({
    'ed-header': true,
    [className]: true,
    clickable: !!onClick,
    padded,
    thin,
  });
  const props = { className: classes, onClick, style };

  return React.cloneElement(headers[size - 1], {
    children,
    ...props,
  });
};

export interface HeaderProps {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  thin?: boolean;
  padded?: boolean;
}

export default Header;
