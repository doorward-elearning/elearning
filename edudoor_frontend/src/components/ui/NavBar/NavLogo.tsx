import React, { MouseEventHandler } from 'react';
import { NavbarFeatures } from './index';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes/routes';
import './NavLogo.scss';
import CONSTANTS from '../../../assets/constants';
import { MemoryHistory } from 'history';

const NavLogo: React.FunctionComponent<NavLogoProps> = props => {
  return (
    <div className="nav-logo">
      <FeatureProvider features={props.features}>
        <Feature feature={NavbarFeatures.HAMBURGER}>
          <Icon className="hamburger" icon="menu" onClick={props.onHamburgerClick} />
        </Feature>
        <Feature feature={NavbarFeatures.BACK_BUTTON} excludeIfHas={NavbarFeatures.HAMBURGER}>
          <Icon
            icon="arrow_back"
            onClick={(): void => {
              props.history.goBack();
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
      </FeatureProvider>
    </div>
  );
};

export interface NavLogoProps {
  features: Array<NavbarFeatures | string | typeof NavbarFeatures>;
  onHamburgerClick?: MouseEventHandler;
  history: MemoryHistory;
}

export default NavLogo;
