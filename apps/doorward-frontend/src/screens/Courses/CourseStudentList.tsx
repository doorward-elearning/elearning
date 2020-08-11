import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { fetchCourseStudentListAction, unEnrollStudentAction } from '../../reducers/courses/actions';
import useViewCourse from '../../hooks/useViewCourse';
import useRoutes from '../../hooks/useRoutes';
import useAction from '@doorward/ui/hooks/useActions';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import Dropdown from '@doorward/ui/components/Dropdown';
import { Student } from '@doorward/common/models/Student';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';

const StudentDropdownMenu: React.FunctionComponent<{ student: Student; onUnEnroll: (student: Student) => void }> = ({
  student,
  onUnEnroll,
}) => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => onUnEnroll(student)} icon="delete">
        Un-enroll
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const CourseStudentList: React.FunctionComponent<StudentListProps> = props => {
  const studentList = useSelector((state: State) => state.courses.studentList);
  const routes = useRoutes();
  const unEnrollStudentModal = useModal(false);
  const unEnrollState = useSelector((state: State) => state.courses.unEnrollStudent);
  const [unEnrollStudent, setUnEnrollStudent] = useState(null);
  useViewCourse();

  const fetch = useAction(fetchCourseStudentListAction);

  const [courseId, course] = useViewCourse();

  useEffect(() => {
    fetch(courseId);
  }, []);

  useEffect(() => {
    if (unEnrollStudent) {
      unEnrollStudentModal.openModal();
    } else {
      unEnrollStudentModal.closeModal();
    }
  }, [unEnrollStudent]);

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
                actionMenu: student => <StudentDropdownMenu student={student} onUnEnroll={setUnEnrollStudent} />,
              }}
              onClickStudent={student => {
                routes.navigate(routes.viewStudent, { studentId: student.id });
              }}
              students={students}
            />
          );
        }}
      </WebComponent>
      <WebConfirmModal
        useModal={unEnrollStudentModal}
        action={() => unEnrollStudentAction(unEnrollStudent.id, courseId)}
        state={unEnrollState}
        showErrorToast
        title="Un-enroll student"
        showSuccessToast
        onSuccess={() => {
          fetch(courseId);
          setUnEnrollStudent(null);
        }}
      >
        <p>Are you sure you want to un-enroll this student from the course?</p>
      </WebConfirmModal>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default CourseStudentList;
