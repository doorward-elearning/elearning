import React, { MouseEventHandler } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import CONSTANTS from '../../assets/constants';
import Icon from '../Icon';

const NavBar: React.FunctionComponent<NavBarProps> = ({ withSidebar, onHamburgerClick }) => {
  return (
    <div className="ed-navBar">
      {withSidebar && <Icon className="hamburger" icon="menu" onClick={onHamburgerClick} />}
      <div className="page-logo">
        <Link to={routes.HOME}>
          <Icon icon="school" className="image" />
          <span className="logo__title">{CONSTANTS.APP_NAME}</span>
        </Link>
      </div>
      {/*<div className="page-header-inner">*/}
      {/*  <div className="page-logo">*/}
      {/*    <Link to="/">*/}
      {/*      <span className="logo-icon material-icons fa-rotate-45">school</span>*/}
      {/*      <span className="logo-default">Edu Door</span>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*  <ul className="nav navbar-nav navbar-left in">*/}
      {/*    <li>*/}
      {/*      <a href="#" className="menu-toggler sidebar-toggler">*/}
      {/*        <i className="icon-menu" />*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*  <NavBarSearch />*/}
      {/*  <a*/}
      {/*    href="javascript:void(0)"*/}
      {/*    className="menu-toggler responsive-toggler"*/}
      {/*    data-toggle="collapse"*/}
      {/*    data-target=".navbar-collapse"*/}
      {/*  >*/}
      {/*    <span />*/}
      {/*  </a>*/}
      {/*  <div className="top-menu">*/}
      {/*    <ul className="nav navbar-nav pull-right">*/}
      {/*      <UserManagement />*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export interface NavBarProps {
  withSidebar?: boolean;
  onHamburgerClick?: MouseEventHandler;
}

export default NavBar;
