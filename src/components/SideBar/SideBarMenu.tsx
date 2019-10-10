import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import SideBarSubMenu from './SideBarSubMenu';

const SideBarMenu: React.FunctionComponent<SideBarMenuProps> = ({ active, open, link, icon, title, subMenu }) => {
  return (
    <li
      className={classNames({
        'nav-item': true,
        start: true,
        active,
        open: active || open,
      })}
    >
      <Link to={link}>
        <i className="material-icons">{icon}</i>
        <span className="title">{title}</span>
        {active && <span className="selected" />}
        <span
          className={classNames({
            arrow: true,
            open,
          })}
        />
        {subMenu && <SideBarSubMenu menu={subMenu} />}
      </Link>
    </li>
  );
};

export interface SideBarMenuProps {
  active?: boolean;
  open?: boolean;
  link: string;
  icon: string;
  title: string;
  subMenu?: Array<{ link: string; title: string }>;
}

export default SideBarMenu;
