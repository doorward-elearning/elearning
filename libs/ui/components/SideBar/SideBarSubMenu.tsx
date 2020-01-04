import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MemoryHistory } from 'history';
import { SubMenuItem } from '@edudoor/frontend/src/hooks/useSidebarSchema';
import useHeightTransition from '@edudoor/frontend/src/hooks/useHeightTransition';
import RoleContainer from '@edudoor/frontend/src/components/static/RolesManager/RoleContainer';

const SideBarSubMenu: React.FunctionComponent<SideBarSubMenuProps> = props => {
  const { menu, active, open, collapsed } = props;
  const list: { current: any } = useRef(null);

  useHeightTransition(list, open, [open, collapsed]);
  return (
    <ul className="sub-menu" ref={list}>
      {menu.map(item => {
        return (
          <RoleContainer roles={item.roles} key={item.name}>
            <li
              className={classNames({
                'side-nav-item': true,
                active: item === active,
              })}
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
