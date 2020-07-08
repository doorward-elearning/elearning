import React from 'react';

const SideNavigation: React.FunctionComponent<SideNavigationProps> = (props): JSX.Element => {
  return (
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div>
  );
};

export interface SideNavigationProps {}

export default SideNavigation;
