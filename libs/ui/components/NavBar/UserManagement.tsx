import React from 'react';
import './UserManagement.scss';
import Button from '../Buttons/Button';
import Condition from '../IfElse';
import useAuth from '../../../hooks/useAuth';
import ROUTES from '../../../routes/routes';
import UserManagementDropdown from '../../static/Dropdowns/UserManagementDropdown';

const UserManagement: React.FunctionComponent<UserManagementProps> = props => {
  const { authenticated } = useAuth();
  return (
    <div className="user-management">
      <Condition condition={authenticated}>
        <UserManagementDropdown />
        <Button link={ROUTES.login.link} theme="secondary">
          Login
        </Button>
      </Condition>
    </div>
  );
};

export interface UserManagementProps {}

export default UserManagement;
