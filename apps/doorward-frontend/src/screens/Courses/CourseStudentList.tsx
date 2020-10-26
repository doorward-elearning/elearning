import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import useViewCourse from '../../hooks/useViewCourse';
import useRoutes from '../../hooks/useRoutes';
import useAction from '@doorward/ui/hooks/useActions';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import Dropdown from '@doorward/ui/components/Dropdown';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import UserEntity from '@doorward/common/entities/user.entity';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import translate from '@doorward/common/lang/translate';

const StudentDropdownMenu: React.FunctionComponent<{
  student: UserEntity;
  onUnEnroll: (student: UserEntity) => void;
}> = ({ student, onUnEnroll }) => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => onUnEnroll(student)} icon="delete">
        {translate.unEnroll()}
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const CourseStudentList: React.FunctionComponent<StudentListProps> = (props) => {
  const studentList = useDoorwardApi((state) => state.students.getStudentsInCourse);
  const routes = useRoutes();
  const unEnrollStudentModal = useModal(false);
  const unEnrollState = useDoorwardApi((state) => state.students.unEnrollStudentFromCourse);
  const [unEnrollStudent, setUnEnrollStudent] = useState(null);
  useViewCourse();

  const fetch = useAction(DoorwardApi.students.getStudentsInCourse);

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
      header={`${course.data?.course?.title ? course.data.course.title + ' - ' : ''} ${translate.studentList()}`}
      actionBtnProps={{
        text: translate.enrollStudent(),
        onClick: (): void => props.history.push(routes.routes.addCourseStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={studentList.data.students} loading={studentList.fetching}>
        {(students): JSX.Element => {
          return (
            <StudentTable
              tableProps={{
                actionMenu: (student) => <StudentDropdownMenu student={student} onUnEnroll={setUnEnrollStudent} />,
              }}
              onClickStudent={(student) => {
                routes.navigate(routes.viewStudent, { studentId: student.id });
              }}
              students={students}
            />
          );
        }}
      </WebComponent>
      <WebConfirmModal
        useModal={unEnrollStudentModal}
        action={() => DoorwardApi.students.unEnrollStudentFromCourse(unEnrollStudent.id, courseId)}
        state={unEnrollState}
        showErrorToast
        title={translate.unEnrollStudent()}
        showSuccessToast
        onSuccess={() => {
          fetch(courseId);
          setUnEnrollStudent(null);
        }}
      >
        <p>{translate.areYouSureYouWantToUnEnrollStudent()}</p>
      </WebConfirmModal>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default CourseStudentList;
