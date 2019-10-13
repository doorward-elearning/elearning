import React from 'react';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { PageComponent } from '../../types';

const Layout: React.FunctionComponent<LayoutProps> = ({ history, location }) => {
  return (
    <div
      id="main-layout"
      className="page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-white dark-sidebar-color logo-dark dark-theme"
    >
      <div className="page-wrapper">
        <NavBar />
        <div className="page-container">
          <SideBar history={history} location={location} />
          <div className="page-content-wrapper">
            <div className="page-content" />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface LayoutProps extends PageComponent {}
export default Layout;
