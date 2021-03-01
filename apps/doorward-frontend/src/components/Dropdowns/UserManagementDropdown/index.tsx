import React, { FunctionComponent, useContext } from 'react';
import Tools from '@doorward/common/utils/Tools';
import Dropdown from '@doorward/ui/components/Dropdown';
import { ThemeContext } from '@doorward/ui/components/ApplicationTheme';
import themes from '@doorward/ui/themes/themes';
import Row from '@doorward/ui/components/Row';
import Switch from '@doorward/ui/components/Switch';
import useAuth from '../../../hooks/useAuth';
import translate from '@doorward/common/lang/translate';
import ProfilePicture from '@doorward/ui/components/ProfilePicture';

const UserManagementDropdown: FunctionComponent<UserManagementDropdownProps> = (props): JSX.Element => {
  const { changeTheme, theme } = useContext(ThemeContext);
  const auth = useAuth();
  const logout = (): void => {
    Tools.clearToken();
    window.location.href = '/login';
  };
  return (
    <Dropdown positionX="right" positionY="bottom">
      <div className="user-management__user">
        <ProfilePicture user={auth.user} />
        <Dropdown.Arrow />
      </div>
      <Dropdown.Menu>
        <Dropdown.Item link={`/profile/${auth.user?.username}`}>
          <Row style={{ padding: 'var(--padding) 0', justifyItems: 'start' }}>
            <ProfilePicture user={auth.user} />
            {auth.user?.username}
          </Row>
        </Dropdown.Item>
        {/*<Dropdown.Item icon="settings" link="" title="Settings" />*/}
        {/*<Dropdown.Item icon="directions" link="" title="Help" />*/}
        <Dropdown.Divider />
        <Dropdown.Item icon="opacity" onClick={changeTheme}>
          <Row style={{ justifyContent: 'space-between', padding: 'var(--padding-lg) 0' }}>
            {translate('darkTheme')}
            <Switch open={theme === themes.dark} onToggle={changeTheme} />
          </Row>
        </Dropdown.Item>
        <Dropdown.Divider />
        {/*<Dropdown.Item icon="lock" link="" title="Lock" />*/}
        <Dropdown.Item icon="exit_to_app" title={translate('logout')} onClick={logout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export interface UserManagementDropdownProps {}

export default UserManagementDropdown;
