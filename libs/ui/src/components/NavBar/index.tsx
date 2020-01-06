import React, { MouseEventHandler } from 'react';
import './NavBar.scss';
import NavBarSearch from './NavBarSearch';
import UserManagement from './UserManagement';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { Location, MemoryHistory } from 'history';
import NavLogo from './NavLogo';
import { NavbarFeatures } from './features';

const NavBar: React.FunctionComponent<NavBarProps> = ({
  onHamburgerClick,
  features,
  history,
  renderNavEnd,
  title,
  loginLink,
  userManagement
}) => {
  return (
    <FeatureProvider features={features}>
      <div className="ed-navBar">
        <div className="ed-navBar__start">
          <NavLogo
            features={features}
            onHamburgerClick={onHamburgerClick}
            history={history}
            title={title}
          />
        </div>
        <div className="ed-navBar__inner">
          <Feature feature={NavbarFeatures.SEARCH_BAR}>
            <NavBarSearch />
          </Feature>
        </div>
        <div className="ed-navBar__end">
          {renderNavEnd && renderNavEnd()}
          <Feature feature={NavbarFeatures.USER_MANAGEMENT}>
            <UserManagement loginLink={loginLink}>
              {userManagement()}
            </UserManagement>
          </Feature>
        </div>
      </div>
    </FeatureProvider>
  );
};

export interface NavBarProps {
  withSidebar?: boolean;
  onHamburgerClick?: MouseEventHandler;
  features: Array<NavbarFeatures | string | typeof NavbarFeatures>;
  history: MemoryHistory;
  location: Location;
  renderNavEnd?: () => JSX.Element;
  title: string;
  loginLink: string;
  userManagement: () => JSX.Element;
}

export default NavBar;
