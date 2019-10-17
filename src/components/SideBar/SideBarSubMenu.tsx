import React, { useEffect, useRef } from 'react';
import { SubMenuItem } from './schema';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const SideBarSubMenu: React.FunctionComponent<SideBarSubMenuProps> = ({ menu, active, open, collapsed }) => {
  const list: { current: any } = useRef(null);

  const modifyHeight = (): void => {
    const { current } = list;
    if (current) {
      if (open) {
        current.style.display = 'block';
        current.style.opacity = 1;
        current.style.maxHeight = current.scrollHeight + 'px';
      } else {
        setTimeout(() => {
          current.style.display = 'none';
        }, 500);
        current.style.maxHeight = 0;
        current.style.opacity = 0;
      }
    }
  };
  useEffect(modifyHeight, [open, collapsed]);

  useEffect(() => {
    setTimeout(modifyHeight, 10);
  }, [list]);

  return (
    <ul className="sub-menu" ref={list}>
      {menu.map(item => {
        return (
          <li
            className={classNames({
              'side-nav-item': true,
              active: item === active,
            })}
            key={item.title}
          >
            <Link to={item.link} className="side-nav-link">
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
  open: boolean;
  collapsed: boolean;
}

export default SideBarSubMenu;
