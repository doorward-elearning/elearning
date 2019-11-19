import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import StudentTable from '../../components/static/Tables/StudentTable';
import WebComponent from '../../components/ui/WebComponent';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '../../hooks/useActions';
import { fetchCourseStudentListAction } from '../../reducers/courses/actions';
import useViewCourse from '../../hooks/useViewCourse';
import useRoutes from '../../hooks/useRoutes';

const CourseStudentList: React.FunctionComponent<StudentListProps> = props => {
  const studentList = useSelector((state: State) => state.courses.studentList);
  const routes = useRoutes();
  useViewCourse();

  const fetch = useAction(fetchCourseStudentListAction);

  const [courseId] = useViewCourse();
  useEffect(() => {
    fetch(courseId);
  }, []);

  return (
    <Layout
      noNavBar
      {...props}
      header="Student List"
      actionBtnProps={{
        text: 'Add Student',
        onClick: (): void => props.history.push(routes.routes.addCourseStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={studentList.data.students} loading={studentList.fetching}>
        {(students): JSX.Element => {
          return <StudentTable students={students} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default CourseStudentList;
