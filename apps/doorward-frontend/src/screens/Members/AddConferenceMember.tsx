import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddMemberForm from '../../components/Forms/AddMemberForm';
import useViewConference from '../../hooks/useViewConference';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { addConferenceMemberAction } from '../../reducers/conferences/actions';

const AddConferenceMember: React.FunctionComponent<AddMemberProps> = props => {
  const memberForm = useForm();
  const [conferenceId] = useViewConference();
  const routes = useRoutes();
  const history = useHistory();
  const createMember = useSelector((state: State) => state.conferences.createMember);
  const submitted = useFormSubmit(createMember);

  return (
    <IfElse condition={submitted && createMember.fetched}>
      <Redirect to={routes.routes.conferenceMembers.link} />
      <Layout
        noNavBar
        {...props}
        header="Add Member"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddMemberForm
          onCancel={(): void => history.push(routes.routes.conferenceMembers.link)}
          useForm={memberForm}
          action={addConferenceMemberAction}
          state={createMember}
          createData={data => [conferenceId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddMemberProps extends PageComponent {}

export default AddConferenceMember;
