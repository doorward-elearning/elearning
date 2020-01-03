import React from 'react';
import IconButton, { IconButtonProps } from './IconButton';

const Fab: React.FunctionComponent<FabProps> = ({ ...props }) => {
  return <IconButton fab {...props} />;
};

export interface FabProps extends IconButtonProps {
  mini?: boolean;
}

export default Fab;
