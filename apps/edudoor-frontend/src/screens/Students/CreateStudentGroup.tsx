import React, { useEffect } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@edudoor/ui/hooks/useActions';
import { fetchStudentListAction } from '../../reducers/students/actions';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Groups from '@edudoor/common/utils/GroupTypes';
import useRoutes from '../../hooks/useRoutes';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  const studentList = useSelector((state: State) => state.students.studentList);
  const fetchStudents = useAction(fetchStudentListAction);
  const routes = useRoutes();
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Create Group">
      <WebComponent
        data={studentList.data.students}
        loading={studentList.fetching}
        emptyMessage="No students have been created yet"
      >
        {students => (
          <AddGroupForm
            onSuccess={() => routes.navigate(routes.studentGroups)}
            users={students}
            title="Students"
            type={Groups.STUDENT}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;
