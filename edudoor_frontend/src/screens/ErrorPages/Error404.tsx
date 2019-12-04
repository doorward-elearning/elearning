import React, { FunctionComponent } from 'react';
import { PageComponent } from '../../types';
import Layout from '../Layout';
import { NavbarFeatures } from '../../components/ui/NavBar';
import './NotFound.scss';
import NotFound from '../../components/ui/NotFound';

const Error404: FunctionComponent<NotFoundProps> = (props): JSX.Element => {
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
          message="The page you are looking for was either deleted or does not exist."
        />
      </div>
    </Layout>
  );
};

export interface NotFoundProps extends PageComponent {}

export default Error404;