import React, { MouseEventHandler } from 'react';
import Image from '../Image';
import Tools from '../../utils/Tools';
import Dropdown from '../Dropdown';
import './UserManagement.scss';
import Icon from '../Icon';
import useAuth from '../../hooks/useAuth';
import Button from '../Buttons/Button';
import { routes } from '../../routes';
import Condition from '../IfElse';

const Item: React.FunctionComponent<ItemProps> = ({ link, title, icon, onClick = (): void => {} }) => {
  return (
    <li>
      <a href={link} onClick={onClick}>
        <Icon icon={icon} /> {title}
      </a>
    </li>
  );
};

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
            <Image src="../assets/img/dp.jpg" circle size="small" />
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
        <Button link={routes.LOGIN} flat>Login</Button>
      </Condition>
    </div>
  );
};

export interface UserManagementProps {}

interface ItemProps {
  link?: string;
  onClick?: MouseEventHandler;
  icon: string;
  title: string;
}

export default UserManagement;
