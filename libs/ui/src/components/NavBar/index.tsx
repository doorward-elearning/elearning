import React, { MouseEventHandler } from 'react';
import './NavBar.scss';
import NavBarSearch from './NavBarSearch';
import UserManagement from './UserManagement';
import FeatureProvider from '../FeatureProvider';
import Feature from '../FeatureProvider/Feature';
import { Location, MemoryHistory } from 'history';
import NavLogo from './NavLogo';
import { NavbarFeatures } from './features';
import useQueryParams from '@edudoor/ui/hooks/useQueryParams';

const NavBar: React.FunctionComponent<NavBarProps> = ({
  onHamburgerClick,
  features,
  history,
  renderNavEnd,
  title,
  icon,
  loginLink,
  userManagement,
}) => {
  const { query, updateLocation } = useQueryParams<{ search: string }>();
  return (
    <FeatureProvider features={features}>
      <div className="ed-navBar">
        <div className="ed-navBar__start">
          <NavLogo
            features={features}
            onHamburgerClick={onHamburgerClick}
            history={history}
            title={title}
            icon={icon}
          />
        </div>
        <div className="ed-navBar__inner">
          <Feature feature={NavbarFeatures.SEARCH_BAR}>
            <NavBarSearch searchText={query.search} onSearch={search => updateLocation({ search })} />
          </Feature>
        </div>
        <div className="ed-navBar__end">
          {renderNavEnd && renderNavEnd()}
          <Feature feature={NavbarFeatures.USER_MANAGEMENT}>
            <UserManagement loginLink={loginLink}>{userManagement()}</UserManagement>
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
  renderNavEnd?: () => JSX.Element;
  title: string;
  loginLink: string;
  userManagement: () => JSX.Element;
  icon: string;
}

export default NavBar;
