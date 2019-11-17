import React, { MouseEventHandler, useState } from 'react';
import NavBar, { NavbarFeatures } from '../../components/ui/NavBar';
import SideBar from '../../components/ui/SideBar';
import { PageComponent } from '../../types';
import classNames from 'classnames';
import './Layout.scss';
import Container from '../../components/ui/Container';
import Tools from '../../utils/Tools';
import Feature from '../../components/ui/FeatureProvider/Feature';
import Header from '../../components/ui/Header';
import FeatureProvider from '../../components/ui/FeatureProvider';
import Icon from '../../components/ui/Icon';
import Button, { ButtonProps } from '../../components/ui/Buttons/Button';
import withBreadCrumbs from '../../hooks/withBreadCrumbs';
import BreadCrumbs from '../../components/ui/BreadCrumbs';
import { Roles } from '../../components/static/RolesManager';
import RoleContainer from '../../components/static/RolesManager/RoleContainer';
import IfElse from '../../components/ui/IfElse';
import ContentSpinner from '../../components/static/UI/ContentSpinner';
import _ from 'lodash';
import { PlainTextField } from '../../components/ui/Input/TextField';

export enum LayoutFeatures {
  HEADER = 1,
  BACK_BUTTON = 2,
  ACTION_BUTTON = 3,
  BREAD_CRUMBS = 4,
  SEARCH_BAR = 5,
}

const ActionButton: React.FunctionComponent<ActionButtonProps> = ({ onClick, text, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {text}
    </Button>
  );
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  history,
  location,
  children,
  header = '',
  className: appendClasses = '',
  renderHeaderEnd,
  features = [],
  searchText = '',
  loading = false,
  actionBtnProps,
  noNavBar,
  onSearch: onSearchText = str => {},
  navFeatures = Tools.enumKeys(NavbarFeatures),
}) => {
  const [sidebarCollapsed, collapseSidebar] = useState(localStorage.getItem('sidebar-collapse') === 'true');
  const [search, setSearchText] = useState(searchText);
  const breadcrumbs = withBreadCrumbs();
  const debouncedSearch = _.debounce(onSearchText, 500);

  const onSearch = ({ target: { value } }: any): void => {
    if (value !== search) {
      setSearchText(value);
      debouncedSearch(value);
    }
  };

  const className = classNames({
    'ed-page-layout': true,
    sidebar: navFeatures.includes(NavbarFeatures.HAMBURGER),
    navBar: !noNavBar && navFeatures.length,
    [appendClasses]: true,
  });

  const toggleSidebar = (): void => {
    localStorage.setItem('sidebar-collapse', !sidebarCollapsed + '');
    collapseSidebar(!sidebarCollapsed);
  };

  return (
    <FeatureProvider features={features}>
      <div id="main-layout" className={className}>
        <div className="ed-page-layout__navBar">
          <NavBar history={history} location={location} features={navFeatures} onHamburgerClick={toggleSidebar} />
        </div>
        <div className="ed-page-layout__sidebar">
          <SideBar
            navBarShown={!noNavBar}
            history={history}
            onHamburgerClick={toggleSidebar}
            location={location}
            collapsed={sidebarCollapsed}
          />
        </div>
        <div className="ed-page-layout__content">
          <Container fullHeight={loading}>
            <IfElse condition={loading}>
              <ContentSpinner type="Grid" />
              <React.Fragment>
                <div className="ed-page-layout__topHeader">
                  <Feature feature={LayoutFeatures.BREAD_CRUMBS}>
                    <BreadCrumbs crumbs={breadcrumbs} />
                  </Feature>
                </div>
                <div className="ed-page-layout__header">
                  <div className="ed-page-layout__header--start">
                    <Feature feature={LayoutFeatures.BACK_BUTTON}>
                      <Icon
                        icon="arrow_back"
                        className="ed-page-layout__header--start__arrow-back"
                        onClick={(): void => {
                          history.goBack();
                        }}
                      />
                    </Feature>
                    <Feature feature={LayoutFeatures.HEADER}>
                      <Header size={1} className="ed-page-layout__header--title">
                        <IfElse condition={header === '--'}>
                          <ContentSpinner width={20} height={20} />
                          <React.Fragment>{header}</React.Fragment>
                        </IfElse>
                      </Header>
                    </Feature>
                    <Feature feature={LayoutFeatures.SEARCH_BAR}>
                      <PlainTextField icon="search" onChange={onSearch} value={search} />
                    </Feature>
                  </div>
                  <div className="ed-page-layout__header--middle" />
                  <div className="ed-page-layout__header--end">
                    {renderHeaderEnd && renderHeaderEnd()}
                    <Feature feature={LayoutFeatures.ACTION_BUTTON}>
                      <RoleContainer roles={actionBtnProps?.roles}>
                        <ActionButton {...actionBtnProps} />
                      </RoleContainer>
                    </Feature>
                  </div>
                </div>
                {children}
              </React.Fragment>
            </IfElse>
          </Container>
        </div>
      </div>
    </FeatureProvider>
  );
};

export interface ActionButtonProps extends ButtonProps {
  onClick?: MouseEventHandler;
  text?: string;
  roles?: Roles | Array<Roles>;
}

export interface LayoutProps extends PageComponent {
  navFeatures?: Array<NavbarFeatures | string | typeof NavbarFeatures>;
  features?: Array<LayoutFeatures | string | typeof LayoutFeatures>;
  header?: string;
  actionBtnProps?: ActionButtonProps;
  className?: string;
  noNavBar?: boolean;
  renderHeaderEnd?: () => JSX.Element;
  loading?: boolean;
  searchText?: string;
  onSearch?: (text: string) => void;
}

export default Layout;
