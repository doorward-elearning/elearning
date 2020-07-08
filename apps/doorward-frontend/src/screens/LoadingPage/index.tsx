import React from 'react';
import './LoadingPage.scss';
import EImage from '@doorward/ui/components/Image';
import useOrganization from '@doorward/ui/hooks/useOrganization';
import Spinner from '@doorward/ui/components/Spinner';
import CONSTANTS from '../../assets/constants';

const LoadingPage: React.FunctionComponent<LoadingPageProps> = props => {
  const organization = useOrganization();
  return (
    <div className="loading-page__content">
      <div className="loading-page__content--loader">
        {organization ? <EImage src={organization.icon} size="medium" /> : <span>{CONSTANTS.APP_NAME}</span>}
        <Spinner type="TailSpin" />
      </div>
    </div>
  );
};

export interface LoadingPageProps {}

export default LoadingPage;
