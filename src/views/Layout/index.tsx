import React, { FunctionComponent, ReactNode, useState } from 'react';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { PageComponent } from '../../types';
import classNames from 'classnames';
import './Layout.scss';

const Layout: React.FunctionComponent<LayoutProps> = ({
  history,
  location,
  children,
  withNavBar = true,
  withSidebar = true,
}) => {
  const [sidebarCollapsed, collapseSidebar] = useState(localStorage.getItem('sidebar-collapse') === 'true');

  const className = classNames({
    'ed-page-layout': true,
    sidebar: withSidebar,
    navBar: withNavBar,
  });

  const toggleSidebar = (): void => {
    localStorage.setItem('sidebar-collapse', !sidebarCollapsed + '');
    collapseSidebar(!sidebarCollapsed);
  };

  return (
    <div id="main-layout" className={className}>
      <div className="ed-page-layout__navBar">
        <NavBar withSidebar={withSidebar} onHamburgerClick={toggleSidebar} />
      </div>
      <div className="ed-page-layout__sidebar">
        <SideBar history={history} location={location} collapsed={sidebarCollapsed} />
      </div>
      <div className="ed-page-layout__content">{children}</div>
    </div>
  );
};

export interface LayoutProps extends PageComponent {
  withSidebar?: boolean;
  withNavBar?: boolean;
}

export default Layout;
