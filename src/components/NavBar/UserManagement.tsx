import React, { MouseEventHandler } from 'react';
import Tools from '../../utils/Tools';

const Item: React.FunctionComponent<ItemProps> = ({ link, title, icon, onClick = (): void => {} }) => {
  return (
    <li>
      <a href={link} onClick={onClick}>
        <i className={icon} /> {title}
      </a>
    </li>
  );
};

const UserManagement: React.FunctionComponent<UserManagementProps> = props => {
  const logout = (): void => {
    Tools.clearToken();
    window.location.href = '/login';
  };
  return (
    <li className="dropdown dropdown-user">
      <a
        href="javascript:void(0)"
        className="dropdown-toggle"
        data-toggle="dropdown"
        data-hover="dropdown"
        data-close-others="true"
      >
        <img alt="" className="img-circle " src="../assets/img/dp.jpg" />
        <span className="username username-hide-on-mobile"> Moses Gitau </span>
        <i className="fa fa-angle-down" />
      </a>
      <ul className="dropdown-menu dropdown-menu-default">
        <Item icon="icon-user" link="" title="Profile" />
        <Item icon="icon-settings" link="" title="Settings" />
        <Item icon="icon-directions" link="" title="Help" />
        <li className="divider" />
        <Item icon="icon-lock" link="" title="Lock" />
        <Item icon="icon-logout" title="Logout" onClick={logout} />
      </ul>
    </li>
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
