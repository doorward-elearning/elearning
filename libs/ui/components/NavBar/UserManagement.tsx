import React from 'react';
import './UserManagement.scss';
import Button from '../Buttons/Button';
import Condition from '../IfElse';
import UserManagementDropdown from '@edudoor/frontend/src/components/Dropdowns/UserManagementDropdown';
import ROUTES from '../../routes/routes';
import useAuth from '../../hooks/useAuth';

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
