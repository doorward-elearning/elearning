import React from 'react';
import schema from './schema';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import { MemoryHistory, Location } from 'history';
import classNames from 'classnames';
import UserPanel from './UserPanel';

const SideBar: React.FunctionComponent<SideBarProps> = ({ history, location, collapsed }) => {
  const className = classNames({
    'eb-sideBar': true,
    collapsed,
  });
  return (
    <div className={className}>
      <ul className="sidemenu">
        <UserPanel collapsed={collapsed} />
        <SideBarMenu history={history} location={location} menu={schema} collapsed={collapsed} />
      </ul>
    </div>
  );
};

export interface SideBarProps {
  history: MemoryHistory;
  location: Location;
  collapsed: boolean;
}

export default SideBar;
