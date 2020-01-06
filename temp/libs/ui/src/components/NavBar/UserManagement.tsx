import React from 'react';
import './UserManagement.scss';
import Button from '../Buttons/Button';
import Condition from '../IfElse';
import useAuth from '../../hooks/useAuth';

const UserManagement: React.FunctionComponent<UserManagementProps> = props => {
  const { authenticated } = useAuth();
  return (
    <div className="user-management">
      <Condition condition={authenticated}>
        <React.Fragment>{props.children}</React.Fragment>
        <Button link={props.loginLink} theme="secondary">
          Login
        </Button>
      </Condition>
    </div>
  );
};

export interface UserManagementProps {
  loginLink: string;
}

export default UserManagement;
