import React, { MouseEventHandler, MutableRefObject } from 'react';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import classNames from 'classnames';
import NavLogo from '../NavBar/NavLogo';
import IfElse from '../IfElse';
import useSidebarSchema, { MenuItem, SideBarSchema } from '../../hooks/useSidebarSchema';
import { UseAuth } from '../../hooks/useAuth';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import UserPanel from '@doorward/ui/components/SideBar/UserPanel';

function SideBar(props: SideBarProps) {
  const { collapsed } = props;
  const schema = useSidebarSchema(props);
  const { authenticated } = props.auth;

  const className = classNames({
    'eb-sideBar': true,
    collapsed,
  });
  return (
    <IfElse condition={authenticated}>
      <div className={className} ref={props.sideBarRef}>
        {!props.navBarShown && (
          <div className="sidebar-logo">
            <NavLogo
              features={[NavbarFeatures.HAMBURGER, NavbarFeatures.PAGE_LOGO]}
              onHamburgerClick={props.onHamburgerClick}
              title={props.title}
              icon={props.icon}
            />
          </div>
        )}
        <ul className="sidemenu">
          <UserPanel collapsed={collapsed} profilePicture="" auth={props.auth} />
          <SideBarMenu
            menu={schema.sidebar}
            selected={schema.selected}
            collapsed={collapsed}
            onItemSelected={props.onItemSelected}
          />
        </ul>
      </div>
    </IfElse>
  );
}

export interface SideBarProps {
  collapsed: boolean;
  navBarShown: boolean;
  onHamburgerClick?: MouseEventHandler;
  schema: SideBarSchema;
  icon: string;
  title: string;
  sideBarRef?: MutableRefObject<HTMLDivElement>;
  onItemSelected?: (item: MenuItem) => void;
  auth: UseAuth;
}

export default SideBar;
