import React, { FunctionComponent } from 'react';
import usePrivileges from '../../hooks/usePrivileges';

const RoleContainer: FunctionComponent<RoleProps> = ({ privileges, children, condition = true }): JSX.Element => {
  const hasPrivileges = usePrivileges();

  return hasPrivileges(...(privileges || [])) && condition ? <React.Fragment>{children}</React.Fragment> : null;
};

export interface RoleProps {
  privileges?: Array<string>;
  condition?: boolean;
}

export default RoleContainer;
