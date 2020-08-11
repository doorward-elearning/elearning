import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddMemberForm from '../../components/Forms/AddMemberForm';
import useViewForum from '../../hooks/useViewForum';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { addForumMemberAction } from '../../reducers/forums/actions';

const AddForumMember: React.FunctionComponent<AddMemberProps> = props => {
  const memberForm = useForm();
  const [forumId] = useViewForum();
  const routes = useRoutes();
  const history = useHistory();
  const createMember = useSelector((state: State) => state.forums.createMember);
  const submitted = useFormSubmit(createMember);

  return (
    <IfElse condition={submitted && createMember.fetched}>
      <Redirect to={routes.routes.forumMembers.link} />
      <Layout
        noNavBar
        {...props}
        header="Add Member"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddMemberForm
          onCancel={(): void => history.push(routes.routes.forumMembers.link)}
          useForm={memberForm}
          action={addForumMemberAction}
          state={createMember}
          createData={data => [forumId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddMemberProps extends PageComponent {}

export default AddForumMember;
