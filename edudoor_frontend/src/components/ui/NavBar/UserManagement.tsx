import React from 'react';
import EImage from '../Image';
import Tools from '../../../utils/Tools';
import Dropdown from '../Dropdown';
import './UserManagement.scss';
import Button from '../Buttons/Button';
import Condition from '../IfElse';
import profile from '../../../assets/images/profile.svg';
import useAuth from '../../../hooks/useAuth';
import ROUTES from '../../../routes/routes';

const UserManagement: React.FunctionComponent<UserManagementProps> = props => {
  const { authenticated } = useAuth();
  const logout = (): void => {
    Tools.clearToken();
    window.location.href = '/login';
  };
  return (
    <div className="user-management">
      <Condition condition={authenticated}>
        <Dropdown positionX="center" positionY="bottom">
          <div className="user-management__user">
            <EImage src={profile} circle size="small" />
            <span className="username username-hide-on-mobile"> Moses Gitau </span>
            <Dropdown.Arrow />
          </div>
          <Dropdown.Menu>
            <Dropdown.Item icon="account_circle" link="" title="Profile" />
            <Dropdown.Item icon="settings" link="" title="Settings" />
            <Dropdown.Item icon="directions" link="" title="Help" />
            <Dropdown.Divider />
            <Dropdown.Item icon="lock" link="" title="Lock" />
            <Dropdown.Item icon="logout" title="Logout" onClick={logout} />
          </Dropdown.Menu>
        </Dropdown>
        <Button link={ROUTES.login.link} flat>
          Login
        </Button>
      </Condition>
    </div>
  );
};

export interface UserManagementProps {}

export default UserManagement;
