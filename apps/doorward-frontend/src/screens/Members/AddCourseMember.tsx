import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddMemberForm from '../../components/Forms/AddMemberForm';
import useViewCourse from '../../hooks/useViewCourse';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect, useHistory } from 'react-router';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { addCourseMemberAction } from '../../reducers/courses/actions';

const AddCourseMember: React.FunctionComponent<AddMemberProps> = props => {
  const memberForm = useForm();
  const [courseId] = useViewCourse();
  const routes = useRoutes();
  const history = useHistory();
  const createMember = useSelector((state: State) => state.courses.createMember);
  const submitted = useFormSubmit(createMember);

  return (
    <IfElse condition={submitted && createMember.fetched}>
      <Redirect to={routes.routes.courseMembers.link} />
      <Layout
        noNavBar
        {...props}
        header="Add Member"
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddMemberForm
          onCancel={(): void => history.push(routes.routes.courseMembers.link)}
          useForm={memberForm}
          action={addCourseMemberAction}
          state={createMember}
          createData={data => [courseId, data]}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddMemberProps extends PageComponent {}

export default AddCourseMember;
