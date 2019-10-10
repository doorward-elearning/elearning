import React from 'react';

const SideBarSubMenu: React.FunctionComponent<SideBarSubMenuProps> = ({ menu }) => {
  return (
    <ul className="sub-menu">
      {menu.map(item => {
        return (
          <li className="nav-item" key={item.title}>
            <a href={item.link} className="nav-link">
              <span className="title">{item.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export interface SideBarSubMenuProps {
  menu: Array<{ title: string; link: string }>;
}

export default SideBarSubMenu;
