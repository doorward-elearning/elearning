import React, { MouseEventHandler } from 'react';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import { Location, MemoryHistory } from 'history';
import classNames from 'classnames';
import UserPanel from './UserPanel';
import useSidebarSchema from '../../../hooks/useSidebarSchema';
import NavLogo from '../NavBar/NavLogo';
import { NavbarFeatures } from '../NavBar';
import useAuth from '../../../hooks/useAuth';
import IfElse from '../IfElse';

const SideBar: React.FunctionComponent<SideBarProps> = props => {
  const { history, location, collapsed } = props;
  const schema = useSidebarSchema(props);
  const { authenticated } = useAuth();

  const className = classNames({
    'eb-sideBar': true,
    collapsed,
  });
  return (
    <IfElse condition={authenticated}>
      <div className={className}>
        {!props.navBarShown && (
          <div className="sidebar-logo">
            <NavLogo
              features={[NavbarFeatures.HAMBURGER, NavbarFeatures.PAGE_LOGO]}
              onHamburgerClick={props.onHamburgerClick}
              history={props.history}
            />
          </div>
        )}
        <ul className="sidemenu">
          <UserPanel collapsed={collapsed} />
          <SideBarMenu
            history={history}
            location={location}
            menu={schema.sidebar}
            selected={schema.selected}
            collapsed={collapsed}
          />
        </ul>
      </div>
    </IfElse>
  );
};

export interface SideBarProps {
  history: MemoryHistory;
  location: Location;
  collapsed: boolean;
  navBarShown: boolean;
  onHamburgerClick?: MouseEventHandler;
}

export default SideBar;
