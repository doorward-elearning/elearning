import React, { useState } from 'react';
import classNames from 'classnames';
import SideBarSubMenu from './SideBarSubMenu';
import { Location, MemoryHistory } from 'history';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { MenuItem, SubMenuItem } from '../../hooks/useSidebarSchema';
import RoleContainer from '../RolesManager/RoleContainer';

const Item: React.FunctionComponent<ItemProps> = props => {
  const { icon, link = '#', name, subMenu, open, onClick, setOpen, collapsed, history } = props;
  const activeSubItem: SubMenuItem | undefined = (subMenu || [{ link, name }]).find((item: SubMenuItem): boolean => {
    return props.selected === item.link;
  });

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
      onClick();
    }
  };

  return (
    <li className={classes}>
      <Link to={subMenu ? '#' : link} className="nav-link" onClick={onItemClick}>
        <Icon icon={icon} />
        <span className="title">{name}</span>
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
  selected,
}): JSX.Element => {
  const activeMenu: MenuItem | undefined = menu.find(item => {
    if (item.link === selected) {
      return true;
    }
    return (item.subMenu || []).find(subMenu => subMenu.link === selected);
  });

  const [open, setOpen] = useState<MenuItem | undefined>(activeMenu);

  const handleOpen = (item: MenuItem, value: boolean): void => {
    setOpen(value ? item : undefined);
  };

  return (
    <React.Fragment>
      {menu.map(item => (
        <RoleContainer roles={item.roles} key={item.name}>
          <Item
            {...item}
            history={history}
            collapsed={collapsed}
            location={location}
            selected={selected}
            open={(open && open.link === item.link) || collapsed}
            setOpen={(value): void => handleOpen(item, value)}
          />
        </RoleContainer>
      ))}
    </React.Fragment>
  );
};

export interface SideBarMenuProps {
  history: MemoryHistory;
  menu: Array<MenuItem>;
  location: Location;
  collapsed: boolean;
  selected: string;
}

export interface ItemProps extends MenuItem {
  history: MemoryHistory;
  location: Location;
  open: boolean;
  collapsed: boolean;
  selected: string;
  setOpen: (open: boolean) => void;
}

export default SideBarMenu;
