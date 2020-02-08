import React from 'react';
import './LoadingPage.scss';
import EImage from '@edudoor/ui/components/Image';
import ProgressBar from '@edudoor/ui/components/ProgressBar';
import useOrganization from '../../hooks/useOrganization';

const LoadingPage: React.FunctionComponent<LoadingPageProps> = props => {
  const organization = useOrganization();
  return (
    <div className="loading-page__content">
      <div className="loading-page__content--loader">
        {organization ? <EImage src={organization.icon} size="medium" /> : <span>Initializing</span>}
        <ProgressBar indeterminate />
      </div>
    </div>
  );
};

export interface LoadingPageProps {}

export default LoadingPage;
