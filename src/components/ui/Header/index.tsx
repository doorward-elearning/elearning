import React, { FunctionComponent, MouseEventHandler } from 'react';
import classNames from 'classnames';

// eslint-disable-next-line react/jsx-key
const headers: Array<React.ReactElement> = [<h1 />, <h2 />, <h3 />, <h4 />, <h5 />, <h6 />];

const Header: FunctionComponent<HeaderProps> = ({ size, children, onClick, className = '' }): JSX.Element => {
  const classes = classNames({
    'eb-header': true,
    [className]: true,
    clickable: !!onClick,
  });
  const props = { className: classes, onClick };

  return React.cloneElement(headers[size - 1], {
    children,
    ...props,
  });
};

export interface HeaderProps {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  onClick?: MouseEventHandler;
}

export default Header;
