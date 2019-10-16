import React, { FunctionComponent } from 'react';

const Container: FunctionComponent<ContainerProps> = ({ children }): JSX.Element => {
  return <div className="container">{children}</div>;
};

export interface ContainerProps {}

export default Container;
