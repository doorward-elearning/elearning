import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@doorward/ui/hooks/useActions';
import { getCurrentOrganization } from '../../reducers/organizations/actions';
import LoadingPage from '../../screens/LoadingPage';
import IfElse from '@doorward/ui/components/IfElse';

const ApplicationInitializer: React.FunctionComponent<OrganizationWrapperProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.organizations.currentOrganization);
  const getUserOrganization = useAction(getCurrentOrganization);

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
