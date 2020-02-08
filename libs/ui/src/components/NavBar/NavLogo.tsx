import React, { MouseEventHandler, useContext } from 'react';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import './NavLogo.scss';
import { MemoryHistory } from 'history';
import EImage from '../Image';
import { ThemeContext } from '../ApplicationTheme';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';

const NavLogo: React.FunctionComponent<NavLogoProps> = props => {
  const theme = useContext(ThemeContext);
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
            <Link to={props.homeLink || ''}>
              <EImage src={props.icon} size={'small'} />
              <span className="logo__title">{props.title}</span>
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
  homeLink?: string;
  title: string;
  icon: string;
}

export default NavLogo;
