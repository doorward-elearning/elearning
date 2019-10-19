import React from 'react';

const If: React.FunctionComponent<IfProps> = props => {
  return <React.Fragment>{props.condition && props.children}</React.Fragment>;
};

export interface IfProps {
  condition: boolean;
}

export default If;
