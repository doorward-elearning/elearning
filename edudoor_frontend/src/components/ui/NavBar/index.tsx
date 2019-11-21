import React, { MouseEventHandler } from 'react';
import './NavBar.scss';
import NavBarSearch from './NavBarSearch';
import UserManagement from './UserManagement';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { Location, MemoryHistory } from 'history';
import NavLogo from './NavLogo';

export enum NavbarFeatures {
  HAMBURGER = 1,
  PAGE_LOGO = 2,
  SEARCH_BAR = 3,
  USER_MANAGEMENT = 4,
  BACK_BUTTON = 5,
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ onHamburgerClick, features, history }) => {
  return (
    <FeatureProvider features={features}>
      <div className="ed-navBar">
        <div className="ed-navBar__start">
          <NavLogo features={features} onHamburgerClick={onHamburgerClick} history={history}/>
        </div>
        <div className="ed-navBar__inner">
          <Feature feature={NavbarFeatures.SEARCH_BAR}>
            <NavBarSearch/>
          </Feature>
        </div>
        <div className="ed-navBar__end">
          <Feature feature={NavbarFeatures.USER_MANAGEMENT}>
            <UserManagement/>
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
}

export default NavBar;
