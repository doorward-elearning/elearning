import React, { FunctionComponent, useContext } from 'react';
import Dropdown from '../../../ui/Dropdown';
import EImage from '../../../ui/Image';
import profile from '../../../../assets/images/profile.svg';
import Tools from '../../../../utils/Tools';
import useRoutes from '../../../../hooks/useRoutes';
import useAuth from '../../../../hooks/useAuth';
import Row from '../../../ui/Row';
import Switch from '../../../ui/Switch';
import themes from '../../../../assets/themes';
import { ThemeContext } from '../../../ui/ApplicationTheme';

const UserManagementDropdown: FunctionComponent<UserManagementDropdownProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const { changeTheme, theme } = useContext(ThemeContext);
  const auth = useAuth();
  const logout = (): void => {
    Tools.clearToken();
    window.location.href = '/login';
  };
  return (
    <Dropdown positionX="right" positionY="bottom">
      <div className="user-management__user">
        <EImage src={profile} circle size="small" />
        <Dropdown.Arrow />
      </div>
      <Dropdown.Menu>
        <Dropdown.Item link={routes.myProfile.withParams({ username: auth.user?.username })}>
          <Row style={{ padding: 'var(--padding) 0', justifyItems: 'start' }}>
            <EImage src={profile} circle size="small" />
            {auth.user?.username}
          </Row>
        </Dropdown.Item>
        <Dropdown.Item icon="settings" link="" title="Settings" />
        <Dropdown.Item icon="directions" link="" title="Help" />
        <Dropdown.Divider />
        <Dropdown.Item icon="opacity" onClick={changeTheme}>
          <Row style={{ justifyContent: 'space-between', padding: 'var(--padding-lg) 0' }}>
            Dark Theme
            <Switch open={theme === themes.dark} onToggle={changeTheme} />
          </Row>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon="lock" link="" title="Lock" />
        <Dropdown.Item icon="exit_to_app" title="Logout" onClick={logout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface UserManagementDropdownProps {}

export default UserManagementDropdown;
