import React, { useEffect } from 'react';
import useAction from '@doorward/ui/hooks/useActions';
import LoadingPage from '../../screens/LoadingPage';
import IfElse from '@doorward/ui/components/IfElse';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';

const ApplicationInitializer: React.FunctionComponent<OrganizationWrapperProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.organizations.getCurrentOrganization);
  const getUserOrganization = useAction(DoorwardApi.organizations.getCurrentOrganization);

  useEffect(() => {
    getUserOrganization();
  }, []);

  return (
    <IfElse condition={state.data.organization}>
      <React.Fragment>{props.children}</React.Fragment>
      <LoadingPage />
    </IfElse>
  );
};

export interface OrganizationWrapperProps {}

export default ApplicationInitializer;
