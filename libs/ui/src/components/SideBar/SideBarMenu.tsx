import React, { useState } from 'react';
import classNames from 'classnames';
import SideBarSubMenu from './SideBarSubMenu';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { MenuItem, SubMenuItem } from '../../hooks/useSidebarSchema';
import RoleContainer from '../RolesManager/RoleContainer';

const Item: React.FunctionComponent<ItemProps> = (props) => {
  const { icon, link = '#', name, subMenu, open, onClick, setOpen, collapsed } = props;
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
    if (!subMenu) {
      props.onItemSelected &&
        props.onItemSelected({
          icon,
          link,
          subMenu,
          name,
        });
    }
  };

  const Parent = (props) => {
    return subMenu ? <span style={{ cursor: 'pointer' }} {...props} /> : <Link {...props} to={link} />;
  };

  return (
    <li className={classes}>
      <Parent className="nav-link" onClick={onItemClick}>
        <Icon icon={icon} />
        <span className="title">{name}</span>
        <Icon icon="keyboard_arrow_right" className={classNames({ arrow: true, open: !!activeSubItem && subMenu })} />
      </Parent>
      {subMenu && (
        <SideBarSubMenu
          menu={subMenu}
          active={activeSubItem}
          open={open}
          collapsed={collapsed}
          onItemSelected={props.onItemSelected}
        />
      )}
    </li>
  );
};
const SideBarMenu: React.FunctionComponent<SideBarMenuProps> = ({
  menu,
  collapsed,
  selected,
  ...props
}): JSX.Element => {
  const activeMenu: MenuItem | undefined = menu.find((item) => {
    if (item.link === selected) {
      return true;
    }
    return (item.subMenu || []).find((subMenu) => subMenu.link === selected);
  });

  const [open, setOpen] = useState<MenuItem | undefined>(activeMenu);

  const handleOpen = (item: MenuItem, value: boolean): void => {
    setOpen(value ? item : undefined);
  };

  return (
    <React.Fragment>
      {menu.map((item) => (
        <RoleContainer privileges={item.privileges} key={item.name}>
          {!item.hidden && (
            <Item
              {...item}
              collapsed={collapsed}
              selected={selected}
              onItemSelected={props.onItemSelected}
              open={(open && open.link === item.link) || collapsed}
              setOpen={(value): void => handleOpen(item, value)}
            />
          )}
        </RoleContainer>
      ))}
    </React.Fragment>
  );
};

export interface SideBarMenuProps {
  menu: Array<MenuItem>;
  collapsed: boolean;
  selected: string;
  onItemSelected?: (item: MenuItem) => void;
}

export interface ItemProps extends MenuItem {
  open: boolean;
  collapsed: boolean;
  selected: string;
  setOpen: (open: boolean) => void;
  onItemSelected?: (item: MenuItem) => void;
}

export default SideBarMenu;
