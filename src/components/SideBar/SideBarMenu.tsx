import React from 'react';
import classNames from 'classnames';
import SideBarSubMenu from './SideBarSubMenu';
import { MemoryHistory, Location } from 'history';
import { MenuItem, SubMenuItem } from './schema';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

const Item: React.FunctionComponent<ItemProps> = ({ icon, link = '#', title, subMenu, location }) => {
  const activeSubItem: SubMenuItem | undefined = (subMenu || [{ link, title }]).find(
    (item: SubMenuItem): boolean => location.pathname === item.link
  );

  const classes = classNames({
    'nav-item': true,
    open: !!activeSubItem,
    subMenu: !!subMenu,
    active: !!activeSubItem,
  });

  return (
    <li className={classes}>
      <Link to={link} className="nav-link">
        <i className="material-icons">{icon}</i>
        <span className="title">{title}</span>
        <Icon icon="keyboard_arrow_right" className={classNames({ arrow: true, open: !!activeSubItem && subMenu })} />
      </Link>
      {subMenu && <SideBarSubMenu menu={subMenu} active={activeSubItem} />}
    </li>
  );
};
const SideBarMenu: React.FunctionComponent<SideBarMenuProps> = ({ menu, history, location }) => {
  return (
    <React.Fragment>
      {menu.map(item => (
        <Item key={item.title} {...item} history={history} location={location} />
      ))}
    </React.Fragment>
  );
};

export interface SideBarMenuProps {
  history: MemoryHistory;
  menu: Array<MenuItem>;
  location: Location;
}

export interface ItemProps extends MenuItem {
  history: MemoryHistory;
  location: Location;
}

export default SideBarMenu;
