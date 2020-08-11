import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddMemberForm, { AddMemberFormState } from '../../components/Forms/AddMemberForm';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';

const AddMember: React.FunctionComponent<AddMemberProps> = props => {
  const memberForm = useForm<AddMemberFormState>();
  const routes = useRoutes();
  const newMember = useSelector((state: State) => state.members.newMember);
  const submitted = useFormSubmit(newMember);

  return (
    <IfElse condition={submitted}>
      <Redirect to={routes.routes.memberList.link} />
      <Layout
        {...props}
        header="Add Member"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddMemberForm
          onCancel={() => routes.navigate(routes.routes.memberList)}
          useForm={memberForm}
          state={newMember}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddMemberProps extends PageComponent {}

export default AddMember;
