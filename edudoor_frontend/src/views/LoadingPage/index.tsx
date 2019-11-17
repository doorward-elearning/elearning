import React from 'react';
import { PageComponent } from '../../types';
import Layout from '../Layout';
import ContentSpinner from '../../components/static/UI/ContentSpinner';
import { NavbarFeatures } from '../../components/ui/NavBar';
import './LoadingPage.scss';

const LoadingPage: React.FunctionComponent<LoadingPageProps> = props => {
  return (
    <Layout {...props} navFeatures={[NavbarFeatures.PAGE_LOGO]} className="loading-page">
      <ContentSpinner type="Grid" />
    </Layout>
  );
};

export interface LoadingPageProps extends PageComponent {}

export default LoadingPage;
