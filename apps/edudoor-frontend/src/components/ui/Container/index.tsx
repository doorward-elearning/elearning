import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

const Container: FunctionComponent<ContainerProps> = ({ children, fullHeight }): JSX.Element => {
  return (
    <div
      className={classNames({
        container: true,
        fullHeight,
      })}
    >
      {children}
    </div>
  );
};

export interface ContainerProps {
  fullHeight?: boolean;
}

export default Container;
