import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import StudentTable from '../../components/Tables/StudentTable';
import useViewCourse from '../../hooks/useViewCourse';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import Dropdown from '@doorward/ui/components/Dropdown';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';
import UserEntity from '@doorward/common/entities/user.entity';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { useApiAction } from 'use-api-action';

const StudentDropdownMenu: React.FunctionComponent<{
  student: UserEntity;
  onUnEnroll: (student: UserEntity) => void;
}> = ({ student, onUnEnroll }) => {
  return (
    <Dropdown.Menu>
      <RoleContainer privileges={['course-students.un-enroll']}>
        <Dropdown.Item onClick={() => onUnEnroll(student)} icon="delete">
          {translate('unEnroll')}
        </Dropdown.Item>
      </RoleContainer>
    </Dropdown.Menu>
  );
};

const CourseStudentList: React.FunctionComponent<StudentListProps> = (props) => {
  const [studentList, studentListState] = useApiAction(DoorwardApi, (api) => api.students.getStudentsInCourse);
  const [unEnrollStudentApi, unEnrollStudentState] = useApiAction(
    DoorwardApi,
    (api) => api.students.unEnrollStudentFromCourse
  );
  const routes = useRoutes();
  const unEnrollStudentModal = useModal(false);
  const [unEnrollStudent, setUnEnrollStudent] = useState(null);
  useViewCourse();

  const [courseId, course] = useViewCourse();

  useEffect(() => {
    studentList(courseId);
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
      header={`${course.data?.course?.title ? course.data?.course.title + ' - ' : ''} ${translate('studentList')}`}
      actionBtnProps={{
        text: translate('enrollStudent'),
        onClick: (): void => props.history.push(routes.routes.addCourseStudent.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={studentListState.data?.students} loading={studentListState.fetching}>
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
        action={() => unEnrollStudentApi(courseId, unEnrollStudent.id)}
        state={unEnrollStudentState}
        showErrorToast
        title={translate('unEnrollStudent')}
        showSuccessToast
        onSuccess={() => {
          studentList(courseId);
          setUnEnrollStudent(null);
        }}
      >
        <p>{translate('areYouSureYouWantToUnEnrollStudent')}</p>
      </WebConfirmModal>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default CourseStudentList;
