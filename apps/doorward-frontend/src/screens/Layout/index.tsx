import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Layout.scss';
import './Layout.mobile.scss';
import ContentSpinner from '../../components/UI/ContentSpinner';
import _ from 'lodash';
import Helmet from 'react-helmet';
import CONSTANTS from '../../assets/constants';
import useRoutes from '../../hooks/useRoutes';
import schema from '../../components/Sidebar/schema';
import UserManagementDropdown from '../../components/Dropdowns/UserManagementDropdown';
import useBreadCrumbs from '@doorward/ui/hooks/useBreadCrumbs';
import IfElse from '@doorward/ui/components/IfElse';
import Tools from '@doorward/common/utils/Tools';
import Button, { ButtonProps } from '@doorward/ui/components/Buttons/Button';
import { Roles } from '@doorward/ui/components/RolesManager';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import Feature from '@doorward/ui/components/FeatureProvider/Feature';
import BreadCrumbs from '@doorward/ui/components/BreadCrumbs';
import { PageComponent } from '@doorward/ui/types';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import Container from '@doorward/ui/components/Container';
import { PlainTextField } from '@doorward/ui/components/Input/TextField';
import NavBar from '@doorward/ui/components/NavBar';
import FeatureProvider from '@doorward/ui/components/FeatureProvider';
import Icon from '@doorward/ui/components/Icon';
import SideBar from '@doorward/ui/components/SideBar';
import Header from '@doorward/ui/components/Header';
import useOrganization from '@doorward/ui/hooks/useOrganization';
import RightMenu from '../../components/Navbar/RightMenu';
import Row from '@doorward/ui/components/Row';
import useLogo from '../../hooks/useLogo';
import Badge from '@doorward/ui/components/Badge';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@doorward/ui/hooks/useActions';
import { clearSuggestionsAction, getSuggestionsAction } from '../../reducers/suggestions/actions';
import { NavBarSearchContext } from '@doorward/ui/components/NavBar/NavBarSearch';
import { ParsedUrlQuery } from 'querystring';

export enum LayoutFeatures {
  HEADER = 1,
  BACK_BUTTON = 2,
  ACTION_BUTTON = 3,
  BREAD_CRUMBS = 4,
  SEARCH_BAR = 5,
  ANNOUNCEMENT = 6,
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
  headerBadge,
  className: appendClasses = '',
  renderHeaderEnd,
  features = [],
  searchText = '',
  loading = false,
  pageTitle,
  actionBtnProps,
  noNavBar,
  withBackground,
  renderNavEnd,
  onSearch: onSearchText = str => {},
  navFeatures = Tools.enumKeys(NavbarFeatures),
  renderTopContent,
  suggestionsType,
  ...props
}) => {
  const [sidebarCollapsed, collapseSidebar] = useState(localStorage.getItem('sidebar-collapse') === 'true');
  const searchSuggestions = useSelector((state: State) => state.suggestions.suggestions);
  const [search, setSearchText] = useState(searchText);
  const routes = useRoutes();
  const { breadcrumbs, titles } = useBreadCrumbs(routes);
  const currentRoute = routes.currentRoute;
  const debouncedSearch = _.debounce(onSearchText, 1000);
  const organization = useOrganization();
  const icon = useLogo();
  const fetchSuggestions = useAction(getSuggestionsAction);
  const clearSuggestions = useAction(clearSuggestionsAction);
  const sideBarRef = useRef();

  useEffect(() => {
    if (suggestionsType) {
      fetchSuggestions(suggestionsType, props.searchQuery);
    }

    return clearSuggestions;
  }, []);

  const onSearch = useCallback(({ target: { value } }: any): void => {
    setSearchText(value);
    debouncedSearch(value);
  }, []);

  const className = classNames({
    'ed-page-layout': true,
    sidebar: navFeatures.includes(NavbarFeatures.HAMBURGER),
    navBar: !noNavBar && navFeatures.length,
    [appendClasses]: true,
    background: withBackground,
  });

  const toggleSidebar = (): void => {
    localStorage.setItem('sidebar-collapse', !sidebarCollapsed + '');
    collapseSidebar(!sidebarCollapsed);
  };
  if (breadcrumbs.length > 1) {
    features.push(LayoutFeatures.BACK_BUTTON);
  }

  const title = pageTitle || titles || (currentRoute ? routes.routes[currentRoute].name : '');

  const isMobile = window.innerWidth < 500;

  return (
    <FeatureProvider features={features}>
      <Helmet>
        <title>{CONSTANTS.APP_NAME + (title && ' - ' + title)}</title>
      </Helmet>
      <div id="main-layout" className={className}>
        <div className="ed-page-layout__navBar">
          <NavBarSearchContext state={searchSuggestions} placeholder={props.searchPlaceholder}>
            <NavBar
              icon={icon}
              history={history}
              location={location}
              loginLink={routes.routes.login.link}
              features={navFeatures}
              title={organization.name}
              onHamburgerClick={toggleSidebar}
              renderNavEnd={() => {
                return (
                  <Row>
                    <RightMenu />
                    {renderNavEnd && renderNavEnd()}
                  </Row>
                );
              }}
              userManagement={() => <UserManagementDropdown />}
            />
          </NavBarSearchContext>
        </div>
        <div
          className={classNames({
            'ed-page-layout__sidebar': true,
            collapsed: sidebarCollapsed,
          })}
          onClick={e => {
            const current = sideBarRef?.current;
            if (current && !current?.contains(e.target)) {
              toggleSidebar();
            }
          }}
        >
          <SideBar
            schema={schema}
            sideBarRef={sideBarRef}
            navBarShown={!noNavBar}
            history={history}
            icon={icon}
            routes={routes}
            title={organization.name}
            onHamburgerClick={toggleSidebar}
            location={location}
            onItemSelected={() => {
              if (isMobile) {
                toggleSidebar();
              }
            }}
            collapsed={isMobile ? false : sidebarCollapsed}
          />
        </div>
        <div className="ed-page-layout__content">
          <Container fullHeight={loading}>
            <IfElse condition={loading}>
              <ContentSpinner type="Grid" />
              <div>
                <div className="ed-page-layout__topContent">{renderTopContent && renderTopContent()}</div>
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
                      <div className="ed-page-layout__header--title">
                        <IfElse condition={header === '--'}>
                          <ContentSpinner width={20} height={20} />
                          <Row>
                            <React.Fragment>{(header as string).substring ? <h1>{header}</h1> : header}</React.Fragment>
                            {headerBadge && <Badge>{headerBadge}</Badge>}
                          </Row>
                        </IfElse>
                      </div>
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
                <div className={'ed-page-layout__full_content'}>
                  <div className={'ed-page-layout__full_content--body'}>{children}</div>
                  <div className={'ed-page-layout__full_content--footer'}>
                    <Feature feature={LayoutFeatures.ANNOUNCEMENT}>
                      <div className="ed-page-layout__announcement">{props.announcement && props.announcement()}</div>
                    </Feature>
                  </div>
                </div>
              </div>
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
  header?: string | JSX.Element;
  headerBadge?: string;
  actionBtnProps?: ActionButtonProps;
  className?: string;
  noNavBar?: boolean;
  renderHeaderEnd?: () => JSX.Element;
  loading?: boolean;
  searchText?: string;
  onSearch?: (text: string) => void;
  pageTitle?: string;
  renderNavEnd?: () => JSX.Element;
  withBackground?: boolean;
  renderTopContent?: () => JSX.Element;
  suggestionsType?: string;
  searchPlaceholder?: string;
  searchQuery?: ParsedUrlQuery;
  announcement?: () => JSX.Element;
}

export default Layout;
