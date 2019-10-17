import React, { useState } from 'react';
import classNames from 'classnames';
import SideBarSubMenu from './SideBarSubMenu';
import { MemoryHistory, Location } from 'history';
import { MenuItem, SubMenuItem } from './schema';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

const Item: React.FunctionComponent<ItemProps> = ({ icon, link = '#', title, subMenu, open, setOpen, collapsed }) => {
  const activeSubItem: SubMenuItem | undefined = (subMenu || [{ link, title }]).find(
    (item: SubMenuItem): boolean => location.pathname === item.link
  );

  const classes = classNames({
    'nav-item': true,
    open: open,
    subMenu: !!subMenu,
    active: !!activeSubItem,
  });

  return (
    <li className={classes}>
      <Link to={subMenu ? '#' : link} className="nav-link" onClick={(): void => setOpen(!open)}>
        <i className="material-icons">{icon}</i>
        <span className="title">{title}</span>
        <Icon icon="keyboard_arrow_right" className={classNames({ arrow: true, open: !!activeSubItem && subMenu })} />
      </Link>
      {subMenu && <SideBarSubMenu menu={subMenu} active={activeSubItem} open={open} collapsed={collapsed} />}
    </li>
  );
};
const SideBarMenu: React.FunctionComponent<SideBarMenuProps> = ({
  menu,
  history,
  location,
  collapsed,
}): JSX.Element => {
  const activeMenu: MenuItem | undefined = menu.find(item => {
    if (item.link === location.pathname) {
      return true;
    }
    return (item.subMenu || []).find(subMenu => subMenu.link === location.pathname);
  });

  const [open, setOpen] = useState<MenuItem | undefined>(activeMenu);

  const handleOpen = (item: MenuItem, value: boolean): void => {
    setOpen(value ? item : undefined);
  };

  return (
    <React.Fragment>
      {menu.map(item => (
        <Item
          key={item.title}
          {...item}
          history={history}
          collapsed={collapsed}
          location={location}
          open={open === item || collapsed}
          setOpen={(value): void => handleOpen(item, value)}
        />
      ))}
    </React.Fragment>
  );
};

export interface SideBarMenuProps {
  history: MemoryHistory;
  menu: Array<MenuItem>;
  location: Location;
  collapsed: boolean;
}

export interface ItemProps extends MenuItem {
  history: MemoryHistory;
  location: Location;
  open: boolean;
  collapsed: boolean;
  setOpen: (open: boolean) => void;
}

export default SideBarMenu;
