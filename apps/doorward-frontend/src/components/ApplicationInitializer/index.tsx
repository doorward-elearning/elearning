import React, { useEffect, useState } from 'react';
import useAction from '@doorward/ui/hooks/useActions';
import LoadingPage from '../../screens/LoadingPage';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import configureLang from '@doorward/common/lang/frontend.config';

const ApplicationInitializer: React.FunctionComponent<OrganizationWrapperProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.organizations.getCurrentOrganization);
  const [loadingLang, setLoadingLang] = useState(true);

  useEffect(() => {
    configureLang(process.env.REACT_APP_BASE_URL).then(() => {
      setLoadingLang(false);
    });
  }, []);

  const getUserOrganization = useAction(DoorwardApi.organizations.getCurrentOrganization);

  useEffect(() => {
    getUserOrganization();
  }, []);

  useEffect(() => {
    if (state.data.organization) {
    }
  }, [state]);

  return <React.Fragment>{!state.data.organization || loadingLang ? <LoadingPage/> : props.children}</React.Fragment>;
};

export interface OrganizationWrapperProps {
}

export default ApplicationInitializer;
