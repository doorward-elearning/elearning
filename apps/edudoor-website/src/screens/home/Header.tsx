import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FunctionComponent<HeaderProps> = (props): JSX.Element => {
  return (
    <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="site-logo mr-auto w-25">
            <a href="index.html">Edudoor</a>
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
                  <a href="#email-section" className="nav-link">
                    Email IDs
                  </a>
                </li>
                <li>
                  <a href="#lms-section" className="nav-link">
                    LMS
                  </a>
                </li>
                <li>
                  <a href="#setup-section" className="nav-link">
                    Quickstart
                  </a>
                </li>
                <li>
                  <a href="#pricing-section" className="nav-link">
                    Pricing
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

          <div className="ml-auto w-25">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                <li className="cta">
                  <a href={process.env.EDUDOOR_APPLICATION_LINK + '/login'} className="nav-link">
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
