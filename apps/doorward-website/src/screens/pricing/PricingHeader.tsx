import React from 'react';

const PricingHeader: React.FunctionComponent<PricingHeaderProps> = (props): JSX.Element => {
  return (
    <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="site-logo mr-auto w-25">
            <a href="/">Doorward</a>
          </div>

          <div className="mx-auto text-center">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
                <li>
                  <a href="#forums-section" className="nav-link">
                    Plans and Pricing
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="ml-auto w-25">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                <li className="cta">
                  <a href="/" className="nav-link">
                    <span>Home</span>
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

export interface PricingHeaderProps {}

export default PricingHeader;
