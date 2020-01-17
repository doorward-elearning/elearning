import React, { useEffect } from 'react';
import { PageComponent } from '@edudoor/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@edudoor/ui/hooks/useActions';
import { fetchStudentListAction } from '../../reducers/students/actions';
import WebComponent from '@edudoor/ui/components/WebComponent';

const CreateStudentGroup: React.FunctionComponent<CreateStudentGroupProps> = (props): JSX.Element => {
  const studentList = useSelector((state: State) => state.students.studentList);
  const fetchStudents = useAction(fetchStudentListAction);
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
        {students => <AddGroupForm users={students} />}
      </WebComponent>
    </Layout>
  );
};

export interface CreateStudentGroupProps extends PageComponent {}

export default CreateStudentGroup;
