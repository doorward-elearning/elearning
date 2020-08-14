import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

const Container: FunctionComponent<ContainerProps> = ({ children, fullHeight, className }): JSX.Element => {
  return (
    <div
      className={classNames({
        'ed-container': true,
        fullHeight,
        [className || '']: true
      })}
    >
      {children}
    </div>
  );
};

export interface ContainerProps {
  fullHeight?: boolean;
  className?: string;
}

export default Container;
