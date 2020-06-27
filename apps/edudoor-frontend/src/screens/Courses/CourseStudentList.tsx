import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { fetchCourseStudentListAction } from '../../reducers/courses/actions';
import useViewCourse from '../../hooks/useViewCourse';
import useRoutes from '../../hooks/useRoutes';
import useAction from '@edudoor/ui/hooks/useActions';
import WebComponent from '@edudoor/ui/components/WebComponent';
import { PageComponent } from '@edudoor/ui/types';
import Dropdown from '@edudoor/ui/components/Dropdown';
import { Student } from '@edudoor/common/models/Student';

const StudentDropdownMenu: React.FunctionComponent<{ student: Student }> = ({ student }) => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => alert(student.fullName)} icon="delete">
        Un-enroll
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const CourseStudentList: React.FunctionComponent<StudentListProps> = props => {
  const studentList = useSelector((state: State) => state.courses.studentList);
  const routes = useRoutes();
  useViewCourse();

  const fetch = useAction(fetchCourseStudentListAction);

  const [courseId, course] = useViewCourse();
  useEffect(() => {
    fetch(courseId);
  }, []);

  return (
    <Layout
      noNavBar
      {...props}
      header={`${course.data?.course?.title ? course.data.course.title + ' - ' : ''} Student List`}
      actionBtnProps={{
        text: 'Enroll Student',
        onClick: (): void => props.history.push(routes.routes.addCourseStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={studentList.data.students} loading={studentList.fetching}>
        {(students): JSX.Element => {
          return (
            <StudentTable
              tableProps={{
                actionMenu: student => <StudentDropdownMenu student={student} />,
              }}
              onClickStudent={student => {
                routes.navigate(routes.viewStudent, { studentId: student.id });
              }}
              students={students}
            />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default CourseStudentList;
