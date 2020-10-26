import React, { FunctionComponent } from 'react';
import Layout from '../Layout';
import './NotFound.scss';
import NotFound from '../../../../../libs/ui/src/components/NotFound';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import { PageComponent } from '@doorward/ui/types';
import useRoutes from '../../hooks/useRoutes';
import translate from '@doorward/common/lang/translate';

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
          title={translate.error404()}
          buttonText={translate.goBackHome()}
          buttonLink={routes.dashboard.link}
          message={translate.thePageYouAreLookingForDoesNotExist()}
        />
      </div>
    </Layout>
  );
};

export interface NotFoundProps extends PageComponent {}

export default Error404;
