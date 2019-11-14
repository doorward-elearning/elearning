import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MemoryHistory } from 'history';
import { SubMenuItem } from '../../../hooks/useSidebarSchema';
import useHeightTransition from '../../../hooks/useHeightTransition';
import RoleContainer from '../../static/RolesManager/RoleContainer';

const SideBarSubMenu: React.FunctionComponent<SideBarSubMenuProps> = props => {
  const { menu, active, open, collapsed } = props;
  const list: { current: any } = useRef(null);

  useHeightTransition(list, open, [open, collapsed]);
  return (
    <ul className="sub-menu" ref={list}>
      {menu.map(item => {
        return (
          <RoleContainer roles={item.roles}>
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
          </RoleContainer>
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
