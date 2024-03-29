import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FunctionComponent<HeaderProps> = (props): JSX.Element => {
  return (
    <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="site-logo mr-auto">
            <a href="index.html">Doorward</a>
          </div>
          <div className="mx-auto text-center">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
                <li>
                  <a href="#home-section" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#classroom-section" className="nav-link">
                    Live Classrooms
                  </a>
                </li>
                <li>
                  <a href="#college-section" className="nav-link">
                    Colleges
                  </a>
                </li>
                <li>
                  <a href="#k12-section" className="nav-link">
                    K-12
                  </a>
                </li>
                <li>
                  <a href="#corporate-section" className="nav-link">
                    Corporates
                  </a>
                </li>
                <li>
                  <a href="#lms-section" className="nav-link">
                    LMS
                  </a>
                </li>
                <li>
                  <a href="#email-section" className="nav-link">
                    Email IDs
                  </a>
                </li>
                <li>
                  <a href="#setup-section" className="nav-link">
                    Quickstart
                  </a>
                </li>
                <li>
                  <a href="#about-section" className="nav-link">
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="ml-auto">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                <li className="cta">
                  <a href={process.env.DOORWARD_APPLICATION_LINK + '/login'} className="nav-link">
                    <span>Login</span>
                  </a>
                </li>
              </ul>
            </nav>
            <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right">
              <span className="icon-menu h3" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export interface HeaderProps {}

export default Header;
