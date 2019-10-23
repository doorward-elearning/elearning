import React from 'react';
import './SideBar.scss';
import SideBarMenu from './SideBarMenu';
import { MemoryHistory, Location } from 'history';
import classNames from 'classnames';
import UserPanel from './UserPanel';
import useSidebarSchema from '../../../hooks/useSidebarSchema';

const SideBar: React.FunctionComponent<SideBarProps> = props => {
  const { history, location, collapsed } = props;
  const schema = useSidebarSchema(props);

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
