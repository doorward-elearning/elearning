import React, { useEffect } from 'react';
import useAction from '@doorward/ui/hooks/useActions';
import LoadingPage from '../../screens/LoadingPage';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';

const ApplicationInitializer: React.FunctionComponent<OrganizationWrapperProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.organizations.getCurrentOrganization);

  const getUserOrganization = useAction(DoorwardApi.organizations.getCurrentOrganization);

  useEffect(() => {
    getUserOrganization();
  }, []);

  return <React.Fragment>{state.data.organization ? props.children : <LoadingPage />}</React.Fragment>;
};

export interface OrganizationWrapperProps {}

export default ApplicationInitializer;
