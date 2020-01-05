import React, { useContext } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout from '../Layout';
import './LoadingPage.scss';
import { ThemeContext } from '@edudoor/ui/components/ApplicationTheme';
import EImage from '@edudoor/ui/components/Image';
import ProgressBar from '@edudoor/ui/components/ProgressBar';

const LoadingPage: React.FunctionComponent<LoadingPageProps> = props => {
  const theme = useContext(ThemeContext);
  return (
    <Layout {...props} noNavBar navFeatures={[]} className="loading-page" withBackground>
      <div className="loading-page__content">
        <div className="loading-page__content--loader">
          <EImage src={theme.theme.logo} size="medium" />
          <ProgressBar indeterminate />
        </div>
      </div>
    </Layout>
  );
};

export interface LoadingPageProps extends PageComponent {}

export default LoadingPage;
