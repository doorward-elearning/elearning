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
import Button from '../../components/ui/Buttons/Button';
import withBreadCrumbs from '../../hooks/withBreadCrumbs';
import BreadCrumbs from '../../components/ui/BreadCrumbs';

export enum LayoutFeatures {
  HEADER = 1,
  BACK_BUTTON = 2,
  ACTION_BUTTON = 3,
  BREAD_CRUMBS = 4,
}

const ActionButton: React.FunctionComponent<ActionButtonProps> = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  history,
  location,
  match,
  children,
  header = '',
  renderHeaderEnd,
  features = [],
  actionBtnProps,
  navFeatures = Tools.enumKeys(NavbarFeatures),
}) => {
  const [sidebarCollapsed, collapseSidebar] = useState(localStorage.getItem('sidebar-collapse') === 'true');
  const breadcrumbs = withBreadCrumbs(match);

  const className = classNames({
    'ed-page-layout': true,
    sidebar: navFeatures.includes(NavbarFeatures.HAMBURGER),
    navBar: navFeatures.length,
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
          <SideBar history={history} location={location} collapsed={sidebarCollapsed} />
        </div>
        <div className="ed-page-layout__content">
          <Container>
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
                  <Header size={1}>{header}</Header>
                </Feature>
              </div>
              <div className="ed-page-layout__header--middle" />
              <div className="ed-page-layout__header--end">
                <Feature feature={LayoutFeatures.ACTION_BUTTON}>
                  <ActionButton {...actionBtnProps} />
                </Feature>
                {renderHeaderEnd}
              </div>
            </div>
            {children}
          </Container>
        </div>
      </div>
    </FeatureProvider>
  );
};

export type ActionButtonProps = {
  onClick?: MouseEventHandler;
  text?: string;
};

export interface LayoutProps extends PageComponent {
  navFeatures?: Array<NavbarFeatures | string | typeof NavbarFeatures>;
  features?: Array<LayoutFeatures | string | typeof LayoutFeatures>;
  header?: string;
  actionBtnProps?: ActionButtonProps;
  renderHeaderEnd?: () => JSX.Element;
}

export default Layout;
