import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import AddStudentForm, { AddStudentFormState } from '../../components/static/Forms/AddStudentForm';
import useForm from '../../hooks/useForm';
import useViewCourse from '../../hooks/useViewCourse';
import useAction from '../../hooks/useActions';
import { addCourseStudentAction } from '../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';

const AddCourseStudent: React.FunctionComponent<AddStudentProps> = props => {
  const studentForm = useForm<AddStudentFormState>();
  const createStudent = useAction(addCourseStudentAction);
  const [courseId] = useViewCourse();
  const createCourse = useSelector((state: State) => state.courses.createStudent);

  const onSubmit = (values: AddStudentFormState): void => {
    createStudent(courseId, values);
  };

  return (
    <Layout
      noNavBar
      {...props}
      header="Add Student"
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
    >
      <AddStudentForm useForm={studentForm} onSubmit={onSubmit} state={createCourse} />
    </Layout>
  );
};

export interface AddStudentProps extends PageComponent {}

export default AddCourseStudent;
