import React, { useEffect } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@edudoor/ui/hooks/useActions';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Groups from '@edudoor/common/utils/GroupTypes';
import { fetchTeacherListAction } from '../../reducers/teachers/actions';
import useRoutes from '../../hooks/useRoutes';

const CreateTeacherGroup: React.FunctionComponent<CreateTeacherGroupProps> = (props): JSX.Element => {
  const teacherList = useSelector((state: State) => state.teachers.teacherList);
  const fetchTeachers = useAction(fetchTeacherListAction);
  const routes = useRoutes();
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Create Group">
      <WebComponent
        data={teacherList.data.teachers}
        loading={teacherList.fetching}
        emptyMessage="No teachers have been created yet"
      >
        {teachers => (
          <AddGroupForm
            onSuccess={() => routes.navigate(routes.teacherGroups)}
            users={teachers}
            title="Teachers"
            type={Groups.TEACHER}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface CreateTeacherGroupProps extends PageComponent {}

export default CreateTeacherGroup;
