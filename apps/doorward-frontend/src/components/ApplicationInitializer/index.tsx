import React, { useEffect, useState } from 'react';
import LoadingPage from '../../screens/LoadingPage';
import DoorwardApi from '../../services/apis/doorward.api';
import configureLang from '@doorward/common/lang/frontend.config';
import { useApiAction } from 'use-api-action';
import useAuth from '../../hooks/useAuth';

const ApplicationInitializer: React.FunctionComponent<OrganizationWrapperProps> = (props): JSX.Element => {
  const [loadingLang, setLoadingLang] = useState(true);
  const { authenticated } = useAuth();
  const [getCurrentUser] = useApiAction(DoorwardApi, (api) => api.auth.getCurrentUser);

  useEffect(() => {
    configureLang(process.env.REACT_APP_BASE_URL).then(() => {
      setLoadingLang(false);
    });

    if (authenticated) {
      getCurrentUser();
    }
  }, []);

  const [getUserOrganization, state] = useApiAction(DoorwardApi, (api) => api.organizations.getCurrentOrganization);

  useEffect(() => {
    getUserOrganization();
  }, []);

  return <React.Fragment>{!state.data?.organization || loadingLang ? <LoadingPage /> : props.children}</React.Fragment>;
};

export interface OrganizationWrapperProps {}

export default ApplicationInitializer;
