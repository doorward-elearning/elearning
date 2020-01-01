import React, { useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import { match } from 'react-router';
import useModal from '../../hooks/useModal';
import { ModalFeatures } from '../../components/ui/Modal';
import WebComponent from '../../components/ui/WebComponent';
import './Courses.scss';
import CourseModuleList from '../../components/static/Lists/CourseModuleList';
import CourseViewSidebar from '../../components/static/CourseViewSidebar';
import IfElse from '../../components/ui/IfElse';
import useViewCourse from '../../hooks/useViewCourse';
import ChooseStudentModal from '../../components/static/Modals/ChooseStudentModal';
import AddCourseModuleModal from '../../components/static/Modals/AddCourseModuleModal';
import Button from '../../components/ui/Buttons/Button';
import RoleContainer from '../../components/static/RolesManager/RoleContainer';
import { Roles } from '../../components/static/RolesManager';
import EditableLabelForm from '../../components/static/Forms/EditableLabelForm';
import { startLiveClassroom, updateCourseAction } from '../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import CourseViewMenu from '../../components/static/Dropdowns/CourseViewMenu';
import LabelRow from '../../components/ui/LabelRow';
import ProgressModal from '../../components/static/Modals/ProgressModal';
import useRoutes from '../../hooks/useRoutes';
import useEventListener from '../../hooks/useEventListener';
import { LIVE_CLASSROOM_STARTED } from '../../reducers/socket/types';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);
  const liveClassroomModal = useModal(false);

  const liveClassroom: any = useEventListener(LIVE_CLASSROOM_STARTED);

  const [courseId, course] = useViewCourse();
  const routes = useRoutes();

  const updateCourse = useSelector((state: State) => state.courses.updateCourse);
  const launchClassroom = useSelector((state: State) => state.courses.launchClassroom);
  return (
    <Layout
      {...props}
      className="view-course"
      noNavBar
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={
        <IfElse condition={course.data.course}>
          <EditableLabelForm
            submitAction={updateCourseAction}
            state={updateCourse}
            name="title"
            roles={[Roles.TEACHER]}
            createData={values => [courseId, values]}
            value={course.data.course?.title}
          />
        </IfElse>
      }
      renderHeaderEnd={(): JSX.Element => {
        return (
          <React.Fragment>
            <RoleContainer roles={[Roles.TEACHER]}>
              <Button onClick={addModuleModal.openModal} bordered>
                Add Module
              </Button>
            </RoleContainer>
            <RoleContainer roles={[Roles.TEACHER]}>
              <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                Start live classroom
              </Button>
            </RoleContainer>
            <IfElse condition={liveClassroom?.courseId}>
              <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                Join live classroom
              </Button>
            </IfElse>
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => startLiveClassroom(courseId)}
              title="Starting classroom"
              useModal={liveClassroomModal}
              onSuccess={data => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <IfElse condition={course.data.course}>
              <CourseViewMenu course={course.data.course} />
            </IfElse>
          </React.Fragment>
        );
      }}
    >
      <div className="view-course__content">
        <WebComponent data={course.data.course} loading={course.fetching}>
          {(course): JSX.Element => {
            return (
              <div>
                <AddCourseModuleModal
                  courseId={course.id}
                  useModal={addModuleModal}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                />
                <ChooseStudentModal
                  courseId={course.id}
                  onSuccess={addStudentModal.closeModal}
                  useModal={addStudentModal}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                />
                <div className="view-course__module-list">
                  <LabelRow>
                    <span className="meta">{course.modules.length} Modules</span>
                    <span className="meta">{course.itemCount.assignments} Assignments</span>
                    <span className="meta">{course.itemCount.quizzes} Quizzes</span>
                    <span className="meta">{course.itemCount.pages} Pages</span>
                  </LabelRow>
                  <CourseModuleList course={course} />
                </div>
              </div>
            );
          }}
        </WebComponent>
        <CourseViewSidebar addStudentModal={addStudentModal} />
      </div>
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
