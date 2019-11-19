import React, { useContext } from 'react';
import { PageComponent } from '../../types';
import Layout from '../Layout';
import './LoadingPage.scss';
import { ThemeContext } from '../../components/ui/ApplicationTheme';
import EImage from '../../components/ui/Image';
import ProgressBar from '../../components/ui/ProgressBar';

const LoadingPage: React.FunctionComponent<LoadingPageProps> = props => {
  const theme = useContext(ThemeContext);
  return (
    <Layout {...props} noNavBar navFeatures={[]} className="loading-page">
      <div className="loading-page__content">
        <div className="loading-page__content--loader">
          <EImage src={theme.theme.logo} size="medium" />
          <ProgressBar indeterminate={true} />
        </div>
      </div>
    </Layout>
  );
};

export interface LoadingPageProps extends PageComponent {}

export default LoadingPage;
