import React from 'react';
import './Layout.scss';
import NavBar from '@doorward/ui/components/NavBar';
import Container from '@doorward/ui/components/Container';
import { PageComponent } from '@doorward/ui/types';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';

const Layout: React.FunctionComponent<LayoutProps> = (props): JSX.Element => {
  return (
    <div className="page__layout">
      {props.withBackground && <div className="page__background" />}
      <NavBar
        features={[NavbarFeatures.PAGE_LOGO]}
        {...props}
        title=""
        auth={null}
        loginLink=""
        userManagement={() => <div />}
        icon="https://res.cloudinary.com/dldhztrbs/image/upload/v1573674362/Doorward/doorward_full_logo_blue.png"
      />
      <Container className="page__content">{props.children}</Container>
    </div>
  );
};

export interface LayoutProps extends PageComponent {
  withBackground?: boolean;
}

export default Layout;
