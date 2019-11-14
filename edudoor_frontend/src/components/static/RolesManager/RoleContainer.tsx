import React, { FunctionComponent, useContext } from 'react';
import { Roles, RolesContext } from './index';
import IfElse from '../../ui/IfElse';

const RoleContainer: FunctionComponent<RoleProps> = (props): JSX.Element => {
  const { roles } = props;
  const { userRoles } = useContext(RolesContext);

  const allRoles: Array<Roles> = [Roles.SUPER_ADMINISTRATOR];

  if (roles instanceof Array) {
    allRoles.push(...roles);
  } else {
    allRoles.push(roles as Roles);
  }
  const hasRole =
    roles && allRoles.length
      ? userRoles.find(role => allRoles.find(userRole => userRole === role.name || userRole === Roles.ALL))
      : true;
  return (
    <IfElse condition={hasRole}>
      <React.Fragment>{props.children}</React.Fragment>
    </IfElse>
  );
};

export interface RoleProps {
  roles?: Array<Roles> | Roles;
}

export default RoleContainer;
