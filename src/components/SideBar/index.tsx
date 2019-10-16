import React from 'react';
import UserPanel from './UserPanel';
import schema from './schema';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import { MemoryHistory, Location } from 'history';
import classNames from 'classnames';

const SideBar: React.FunctionComponent<SideBarProps> = ({ history, location, collapsed }) => {
  const className = classNames({
    'eb-sideBar': true,
    collapsed,
  });
  return (
    <div className={className}>
      <div className="sidemenu-container navbar-collapse collapse fixed-menu">
        <div id="remove-scroll" className="left-sidemenu">
          <ul
            className="sidemenu page-header-fixed slimscroll-style"
          >
            <li className="sidebar-toggle-wrapper hide">
              <div className="sidebar-toggler">
                <span />
              </div>
            </li>
            <UserPanel />
            <SideBarMenu history={history} location={location} menu={schema} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export interface SideBarProps {
  history: MemoryHistory;
  location: Location;
  collapsed: boolean;
}

export default SideBar;
