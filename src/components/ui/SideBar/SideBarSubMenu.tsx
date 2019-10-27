import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MemoryHistory } from 'history';
import { SubMenuItem } from '../../../hooks/useSidebarSchema';

const SideBarSubMenu: React.FunctionComponent<SideBarSubMenuProps> = props => {
  const { menu, active, open, collapsed } = props;
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
            key={item.name}
          >
            <Link to={item.link} className="side-nav-link" onClick={(): void => item.onClick && item.onClick(props)}>
              <span className="title">{item.name}</span>
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
  history: MemoryHistory;
}

export default SideBarSubMenu;
