import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@edudoor/ui/hooks/useActions';
import { getCurrentOrganization } from '../../reducers/organizations/actions';
import LoadingPage from '../../screens/LoadingPage';

const ApplicationInitializer: React.FunctionComponent<OrganizationWrapperProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.organizations.currentOrganization);
  const getUserOrganization = useAction(getCurrentOrganization);

  useEffect(() => {
    getUserOrganization();
  }, []);

  return !state.data.organization ? <LoadingPage /> : <React.Fragment>{props.children}</React.Fragment>;
};

export interface OrganizationWrapperProps {}

export default ApplicationInitializer;
