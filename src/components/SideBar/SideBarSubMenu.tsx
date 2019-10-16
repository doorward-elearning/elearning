import React from 'react';
import { SubMenuItem } from './schema';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const SideBarSubMenu: React.FunctionComponent<SideBarSubMenuProps> = ({ menu, active }) => {
  return (
    <ul className="sub-menu">
      {menu.map(item => {
        return (
          <li
            className={classNames({
              'nav-item': true,
              active: item === active,
            })}
            key={item.title}
          >
            <Link to={item.link} className="nav-link">
              <span className="title">{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export interface SideBarSubMenuProps {
  menu: Array<SubMenuItem>;
  active?: SubMenuItem;
}

export default SideBarSubMenu;
