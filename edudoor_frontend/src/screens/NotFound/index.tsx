import React, { FunctionComponent } from 'react';
import { PageComponent } from '../../types';
import Layout from '../Layout';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Buttons/Button';
import Card from '../../components/ui/Card';
import EImage from '../../components/ui/Image';
import { NavbarFeatures } from '../../components/ui/NavBar';
import notFound from '../../assets/images/notFound.svg';
import './NotFound.scss';
import ROUTES from '../../routes/routes';

const NotFound: FunctionComponent<NotFoundProps> = (props): JSX.Element => {
  return (
    <Layout
      {...props}
      navFeatures={[NavbarFeatures.PAGE_LOGO, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.BACK_BUTTON]}
    >
      <div className="page-not-found">
        <Card>
          <Card.Body>
            <div className="page-not-found__content">
              <Header size={1}>Error 404</Header>
              <EImage src={notFound} size="xLarge" />
              <p>The page you are looking for was not found</p>
              <Button link={ROUTES.dashboard.link}>Go back Home</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export interface NotFoundProps extends PageComponent {}

export default NotFound;