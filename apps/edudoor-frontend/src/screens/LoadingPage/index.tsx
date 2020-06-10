import React from 'react';
import './LoadingPage.scss';
import EImage from '@edudoor/ui/components/Image';
import useOrganization from '@edudoor/ui/hooks/useOrganization';
import Spinner from '@edudoor/ui/components/Spinner';

const LoadingPage: React.FunctionComponent<LoadingPageProps> = props => {
  const organization = useOrganization();
  return (
    <div className="loading-page__content">
      <div className="loading-page__content--loader">
        {organization ? <EImage src={organization.icon} size="medium" /> : <span />}
        <Spinner type="TailSpin" />
      </div>
    </div>
  );
};

export interface LoadingPageProps {}

export default LoadingPage;
