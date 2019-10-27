import React, { MouseEventHandler } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import NavBarSearch from './NavBarSearch';
import UserManagement from './UserManagement';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import CONSTANTS from '../../../assets/constants';
import { PageComponent } from '../../../types';
import ROUTES from '../../../routes/routes';
import { Location, MemoryHistory } from 'history';

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
          <Feature feature={NavbarFeatures.HAMBURGER}>
            <Icon className="hamburger" icon="menu" onClick={onHamburgerClick} />
          </Feature>
          <Feature feature={NavbarFeatures.BACK_BUTTON} excludeIfHas={NavbarFeatures.HAMBURGER}>
            <Icon
              icon="arrow_back"
              onClick={(): void => {
                history.goBack();
              }}
            />
          </Feature>
          <Feature feature={NavbarFeatures.PAGE_LOGO}>
            <div className="page-logo">
              <Link to={ROUTES.home.link}>
                <Icon icon="school" className="image" />
                <span className="logo__title">{CONSTANTS.APP_NAME}</span>
              </Link>
            </div>
          </Feature>
        </div>
        <div className="ed-navBar__inner">
          <Feature feature={NavbarFeatures.SEARCH_BAR}>
            <NavBarSearch />
          </Feature>
        </div>
        <div className="ed-navBar__end">
          <Feature feature={NavbarFeatures.USER_MANAGEMENT}>
            <UserManagement />
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
