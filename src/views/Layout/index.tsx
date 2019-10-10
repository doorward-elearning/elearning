import React from 'react';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

const Layout: React.FunctionComponent<any> = () => {
  return (
    <div id="main-layout" className="page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-white dark-sidebar-color logo-dark">
      <div className="page-wrapper">
        <NavBar />
        <div className="page-container">
          <SideBar />
        </div>
      </div>
    </div>
  );
};
export default Layout;
