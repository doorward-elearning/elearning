import React, { FunctionComponent } from 'react';
import { Roles } from './index';
import IfElse from '../../ui/IfElse';
import useRoleManager from '../../../hooks/useRoleManager';

const RoleContainer: FunctionComponent<RoleProps> = (props): JSX.Element => {
  const roles = props.roles ? (props.roles instanceof Array ? props.roles : [props.roles as Roles]) : undefined;
  const hasRole = useRoleManager(roles);
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
