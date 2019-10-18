import React, { useState } from 'react';
import NavBar, { NavbarFeatures } from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { PageComponent } from '../../types';
import classNames from 'classnames';
import './Layout.scss';
import Container from '../../components/Container';
import Tools from '../../utils/Tools';

const Layout: React.FunctionComponent<LayoutProps> = ({ history, location, children, navFeatures = [Tools.enumKeys(NavbarFeatures)] }) => {
  const [sidebarCollapsed, collapseSidebar] = useState(localStorage.getItem('sidebar-collapse') === 'true');

  const className = classNames({
    'ed-page-layout': true,
    sidebar: navFeatures.includes(NavbarFeatures.HAMBURGER),
    navBar: navFeatures.length,
  });

  const toggleSidebar = (): void => {
    localStorage.setItem('sidebar-collapse', !sidebarCollapsed + '');
    collapseSidebar(!sidebarCollapsed);
  };

  return (
    <div id="main-layout" className={className}>
      <div className="ed-page-layout__navBar">
        <NavBar features={navFeatures} onHamburgerClick={toggleSidebar} />
      </div>
      <div className="ed-page-layout__sidebar">
        <SideBar history={history} location={location} collapsed={sidebarCollapsed} />
      </div>
      <div className="ed-page-layout__content">
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export interface LayoutProps extends PageComponent {
  navFeatures?: Array<NavbarFeatures>;
}

export default Layout;
