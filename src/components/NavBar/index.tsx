import React, { MouseEventHandler } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import CONSTANTS from '../../assets/constants';
import Icon from '../Icon';
import NavBarSearch from './NavBarSearch';
import UserManagement from './UserManagement';
import Condition from '../Condition';

export enum NavbarFeatures {
  HAMBURGER = 1,
  PAGE_LOGO = 2,
  SEARCH_BAR = 3,
  USER_MANAGEMENT = 4,
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ onHamburgerClick, features }) => {
  return (
    <div className="ed-navBar">
      <Condition condition={features.includes(NavbarFeatures.HAMBURGER)}>
        <Icon className="hamburger" icon="menu" onClick={onHamburgerClick} />
      </Condition>
      <Condition condition={features.includes(NavbarFeatures.PAGE_LOGO)}>
        <div className="page-logo">
          <Link to={routes.HOME}>
            <Icon icon="school" className="image" />
            <span className="logo__title">{CONSTANTS.APP_NAME}</span>
          </Link>
        </div>
      </Condition>
      <div className="ed-navBar__inner">
        <Condition condition={features.includes(NavbarFeatures.SEARCH_BAR)}>
          <NavBarSearch />
        </Condition>
        <Condition condition={features.includes(NavbarFeatures.USER_MANAGEMENT)}>
          <UserManagement />
        </Condition>
      </div>
    </div>
  );
};

export interface NavBarProps {
  withSidebar?: boolean;
  onHamburgerClick?: MouseEventHandler;
  features: Array<NavbarFeatures>;
}

export default NavBar;
