import React, { FunctionComponent } from 'react';
import Layout from '../Layout';
import './NotFound.scss';
import NotFound from '../../../../../libs/ui/src/components/NotFound';
import { NavbarFeatures } from '@edudoor/ui/components/NavBar/features';
import { PageComponent } from '@edudoor/ui/types';
import useRoutes from '../../hooks/useRoutes';

const Error404: FunctionComponent<NotFoundProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      withBackground
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.BACK_BUTTON]}
      features={[]}
    >
      <div className="page-not-found">
        <NotFound
          title="Error 404"
          buttonText="Go back Home"
          buttonLink={routes.dashboard.link}
          message="The page you are looking for was either deleted or does not exist."
        />
      </div>
    </Layout>
  );
};

export interface NotFoundProps extends PageComponent {}

export default Error404;
