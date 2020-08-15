import React, { FunctionComponent } from 'react';
import { PageComponent } from '@doorward/ui/types';
import NotFound from '@doorward/ui/components/NotFound';
import Layout from '../Layout';
import './Error404.scss';

const Error404: FunctionComponent<NotFoundProps> = (props): JSX.Element => {
  return (
    <Layout {...props}>
      <div className="page-not-found">
        <NotFound
          title="Error 404"
          buttonText="Go back Home"
          buttonLink="/"
          message="The page you are looking for was either deleted or does not exist."
        />
      </div>
    </Layout>
  );
};

export interface NotFoundProps extends PageComponent {}

export default Error404;
