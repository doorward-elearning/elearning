import React, { useState } from 'react';
import classNames from 'classnames';
import SideBarSubMenu from './SideBarSubMenu';
import { MemoryHistory, Location } from 'history';
import { MenuItem, SubMenuItem } from './schema';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

const Item: React.FunctionComponent<ItemProps> = props => {
  const { icon, link = '#', title, subMenu, open, onClick, setOpen, collapsed, history } = props;
  const activeSubItem: SubMenuItem | undefined = (subMenu || [{ link, title }]).find(
    (item: SubMenuItem): boolean => location.pathname === item.link
  );

  const classes = classNames({
    'nav-item': true,
    open: open,
    subMenu: !!subMenu,
    active: !!activeSubItem,
  });

  const onItemClick = (): void => {
    if (subMenu) {
      setOpen(!open);
    } else if (onClick) {
      onClick(props);
    }
  };

  return (
    <li className={classes}>
      <Link to={subMenu ? '#' : link} className="nav-link" onClick={onItemClick}>
        <Icon icon={icon} />
        <span className="title">{title}</span>
        <Icon icon="keyboard_arrow_right" className={classNames({ arrow: true, open: !!activeSubItem && subMenu })} />
      </Link>
      {subMenu && (
        <SideBarSubMenu history={history} menu={subMenu} active={activeSubItem} open={open} collapsed={collapsed} />
      )}
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
