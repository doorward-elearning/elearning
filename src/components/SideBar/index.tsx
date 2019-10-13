import React from 'react';
import UserPanel from './UserPanel';
import schema from './schema';
import SideBarMenu from './SideBarMenu';
import { MemoryHistory, Location } from 'history';

const SideBar: React.FunctionComponent<SideBarProps> = ({ history, location }) => {
  return (
    <div className="sidebar-container">
      <div className="sidemenu-container navbar-collapse collapse fixed-menu">
        <div id="remove-scroll" className="left-sidemenu">
          <ul
            className="sidemenu page-header-fixed slimscroll-style"
            data-keep-expanded="false"
            data-auto-scroll="true"
            data-slide-speed="200"
            style={{ paddingTop: '20px' }}
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
}

export default SideBar;
