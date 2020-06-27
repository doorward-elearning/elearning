import React, { FunctionComponent } from 'react';
import { RoleEvaluator, Roles } from './index';
import useRoleManager from '../../hooks/useRoleManager';
import IfElse from '../IfElse';

const RoleContainer: FunctionComponent<RoleProps> = ({
  roles,
  showSuperAdmin = true,
  children,
  condition = true,
}): JSX.Element => {
  const allRoles = roles ? (roles instanceof Array ? roles : [roles as Roles]) : undefined;
  const hasRole = useRoleManager(allRoles, showSuperAdmin);
  return (
    <IfElse condition={hasRole && condition}>
      <React.Fragment>{children}</React.Fragment>
    </IfElse>
  );
};

export interface RoleProps {
  roles?: Array<Roles | RoleEvaluator> | Roles;
  showSuperAdmin?: boolean;
  condition?: boolean;
}

export default RoleContainer;
