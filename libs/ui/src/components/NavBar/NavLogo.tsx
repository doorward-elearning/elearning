import React, { MouseEventHandler } from 'react';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import Icon from '../Icon';
import { Link, useHistory } from 'react-router-dom';
import './NavLogo.scss';
import EImage from '../Image';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';

const isMobile = window.innerWidth < 500;
const NavLogo: React.FunctionComponent<NavLogoProps> = (props) => {
  const history = useHistory();
  return (
    <div className="nav-logo">
       <FeatureProvider features={props.features}>
        <Feature feature={NavbarFeatures.HAMBURGER}>
        {isMobile && <Icon className="hamburger" icon="menu" onClick={props.onHamburgerClick} />}
        </Feature>
        <Feature feature={NavbarFeatures.BACK_BUTTON} excludeIfHas={NavbarFeatures.HAMBURGER}>
         {isMobile && <Icon icon="arrow_back" onClick={(): void => {history.goBack();}}/>}
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
  homeLink?: string;
  title: string;
  icon: string;
}

export default NavLogo;
