import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

const headers: Array<React.ReactElement> = [<h1 />, <h2 />, <h3 />, <h4 />, <h5 />, <h6 />];

const Header: FunctionComponent<HeaderProps> = ({ size, children }): JSX.Element => {
  const className = classNames({
    'eb-header': true,
  });
  const props = { className };

  return React.cloneElement(headers[size], {
    children,
    ...props,
  });
};

export interface HeaderProps {
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

export default Header;
