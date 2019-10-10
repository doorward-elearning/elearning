import React from 'react';
import { Link } from 'react-router-dom';
import NavBarSearch from './NavBarSearch';
import UserManagement from './UserManagement';

const NavBar: React.FunctionComponent<NavBarProps> = props => {
  return (
    <div className="page-header navbar navbar-fixed-top">
      <div className="page-header-inner">
        <div className="page-logo">
          <Link to="/">
            <span className="logo-icon material-icons fa-rotate-45">school</span>
            <span className="logo-default">Edu Door</span>
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-left in">
          <li>
            <a href="#" className="menu-toggler sidebar-toggler">
              <i className="icon-menu" />
            </a>
          </li>
        </ul>
        <NavBarSearch />
        <a
          href="javascript:void(0)"
          className="menu-toggler responsive-toggler"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <span />
        </a>
        <div className="top-menu">
          <ul className="nav navbar-nav pull-right">
            <UserManagement />
          </ul>
        </div>
      </div>
    </div>
  );
};

export interface NavBarProps {}

export default NavBar;
