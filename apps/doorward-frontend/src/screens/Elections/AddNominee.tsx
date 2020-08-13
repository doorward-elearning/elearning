import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../hooks/usePageResource';
import { fetchElectionAction } from '../../reducers/elections/actions';
import AddNomineeForm from '../../components/Forms/AddNomineeForm';
import useForm from '@doorward/ui/hooks/useForm';
import { useRouteMatch } from 'react-router';
import useRoutes from '../../hooks/useRoutes';

const AddNominee: React.FunctionComponent<AddNomineeProps> = (props): JSX.Element => {
  const form = useForm();
  const match = useRouteMatch<{ electionId: string }>();
  usePageResource('electionId', fetchElectionAction);
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header={'Add nominee'}
    >
      <AddNomineeForm
        onSuccess={() => {
          routes.navigate(routes.viewElection, { electionId: match.params.electionId });
        }}
        useForm={form}
        electionId={match.params.electionId}
      />
    </Layout>
  );
};

export interface AddNomineeProps extends PageComponent {}

export default AddNominee;
