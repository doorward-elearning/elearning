import React, { FunctionComponent } from 'react';
import Dropdown from '../../../ui/Dropdown';
import EImage from '../../../ui/Image';
import profile from '../../../../assets/images/profile.svg';
import Tools from '../../../../utils/Tools';
import useRoutes from '../../../../hooks/useRoutes';
import useAuth from '../../../../hooks/useAuth';

const UserManagementDropdown: FunctionComponent<UserManagementDropdownProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const auth = useAuth();
  const logout = (): void => {
    Tools.clearToken();
    window.location.href = '/login';
  };
  return (
    <Dropdown positionX="center" positionY="bottom">
      <div className="user-management__user">
        <EImage src={profile} circle size="small" />
        <span className="username username-hide-on-mobile">{auth.user?.fullName}</span>
        <Dropdown.Arrow />
      </div>
      <Dropdown.Menu>
        <Dropdown.Item
          icon="account_circle"
          link={routes.myProfile.withParams({ username: auth.user?.username })}
          title="Profile"
        />
        <Dropdown.Item icon="settings" link="" title="Settings" />
        <Dropdown.Item icon="directions" link="" title="Help" />
        <Dropdown.Divider />
        <Dropdown.Item icon="lock" link="" title="Lock" />
        <Dropdown.Item icon="logout" title="Logout" onClick={logout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface UserManagementDropdownProps {}

export default UserManagementDropdown;
