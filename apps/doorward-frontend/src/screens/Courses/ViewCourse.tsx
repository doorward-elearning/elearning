import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { match, useRouteMatch } from 'react-router';
import './Courses.scss';
import CourseModuleList from '../../components/Lists/CourseModuleList';
import CourseViewSidebar from '../../components/CourseViewSidebar';
import ChooseStudentModal from '../../components/Modals/ChooseStudentModal';
import AddCourseModuleModal from '../../components/Modals/AddCourseModuleModal';
import EditableLabelForm from '../../components/Forms/EditableLabelForm';
import CourseViewMenu from '../../components/Dropdowns/CourseViewMenu';
import ProgressModal from '../../components/Modals/ProgressModal';
import WebComponent from '@doorward/ui/components/WebComponent';
import Button from '@doorward/ui/components/Buttons/Button';
import { ModalFeatures } from '@doorward/ui/components/Modal';
import useModal from '@doorward/ui/hooks/useModal';
import IfElse from '@doorward/ui/components/IfElse';
import { PageComponent } from '@doorward/ui/types';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import ChooseCourseManagerModal from '../../components/Modals/ChooseCourseManagerModal';
import Pill from '@doorward/ui/components/Pill';
import Grid from '@doorward/ui/components/Grid';
import DoorwardApi from '../../services/apis/doorward.api';
import LabelRow from '@doorward/ui/components/LabelRow';
import CreateDiscussionGroupModal from '../../components/Modals/CreateDiscussionGroupModal';
import translate from '@doorward/common/lang/translate';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import { useApiAction } from 'use-api-action';
import useCourse from '../../hooks/useCourse';
import NavLink from '@doorward/ui/components/NavLink';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = (props) => {
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);
  const addCourseManagerModal = useModal(false);
  const liveClassroomModal = useModal(false);
  const createDiscussionGroupModal = useModal();
  const hasPrivileges = usePrivileges();
  const [fetchTeachers, teacherList] = useApiAction(DoorwardApi, (api) => api.teachers.getAllTeachers);
  const [updateCourse, updateCourseState] = useApiAction(DoorwardApi, (api) => api.courses.updateCourse);
  const [launchClassroom, launchClassroomState] = useApiAction(DoorwardApi, (api) => api.courses.launchClassroom);
  const [fetchCourse, course] = useApiAction(DoorwardApi, (api) => api.courses.getCourse);
  const {
    params: { courseId },
  } = useRouteMatch<{ courseId: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (hasPrivileges('teachers.list')) {
      fetchTeachers();
    }
    fetchCourse(courseId);
  }, [courseId]);

  return (
    <Layout
      {...props}
      className="view-course"
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={
        <React.Fragment>
          {course.data?.course && (
            <EditableLabelForm
              key={course.data.course.id}
              submitAction={updateCourse}
              state={updateCourseState}
              name="title"
              privileges={['courses.update']}
              createData={(values) => [courseId, values]}
              value={course.data.course.title}
            />
          )}
        </React.Fragment>
      }
      renderHeaderEnd={(): JSX.Element => {
        const ongoingMeeting = !!course.data?.course?.meetingRoom?.currentMeeting;
        return (
          <React.Fragment>
            <RoleContainer privileges={['modules.create']}>
              <Button onClick={addModuleModal.openModal} bordered>
                {translate('addModule')}
              </Button>
            </RoleContainer>
            {course.data?.course && (
              <React.Fragment>
                {!hasPrivileges('meetings.read-only') && ongoingMeeting && (
                  <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                    {translate('joinMeeting')}
                  </Button>
                )}
                {hasPrivileges('courses.start-meeting') && !ongoingMeeting && (
                  <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                    {translate('startMeeting')}
                  </Button>
                )}
              </React.Fragment>
            )}
            <ProgressModal
              state={launchClassroomState}
              cancellable={false}
              showErrorToast
              action={() => launchClassroom(courseId)}
              title={
                course.data?.course?.meetingRoom?.currentMeeting
                  ? translate('joiningMeeting')
                  : translate('startingMeeting')
              }
              useModal={liveClassroomModal}
              onSuccess={(data) => {
                navigation.navigate(ROUTES.meeting.join, {
                  meetingId: data?.meeting?.id,
                });
              }}
            />
            <IfElse condition={course.data?.course}>
              <CourseViewMenu course={course.data?.course} />
            </IfElse>
          </React.Fragment>
        );
      }}
    >
      <div className="view-course__content">
        <WebComponent data={course.data?.course} loading={course.fetching}>
          {(course): JSX.Element => {
            return (
              <div>
                <AddCourseModuleModal
                  courseId={course.id}
                  useModal={addModuleModal}
                  onSuccess={() => {
                    fetchCourse(course.id);
                  }}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                />
                <ChooseStudentModal
                  courseId={course.id}
                  className="choose__student__modal"
                  onSuccess={addStudentModal.closeModal}
                  useModal={addStudentModal}
                  features={[
                    ModalFeatures.POSITIVE_BUTTON,
                    ModalFeatures.CLOSE_BUTTON_FOOTER,
                    ModalFeatures.SEARCH_BAR,
                  ]}
                />
                <ChooseCourseManagerModal
                  managers={teacherList}
                  onSuccess={addCourseManagerModal.closeModal}
                  courseId={course.id}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                  useModal={addCourseManagerModal}
                />
                <CreateDiscussionGroupModal modal={createDiscussionGroupModal} courseId={course.id} />
                <div className="view-course__module-list">
                  <Grid columns={2} justifyContent="space-between">
                    <LabelRow>
                      <span className="meta">
                        {translate('moduleWithCount', { count: course?.modules?.length || 0 })}
                      </span>
                      <NavLink
                        to={ROUTES.courses.modules.assignments.list}
                        params={{ courseId: course?.id }}
                        className="meta"
                      >
                        {translate('assignmentWithCount', {
                          count: course?.itemsCount?.[ModuleItemType.ASSIGNMENT] || 0,
                        })}
                      </NavLink>
                      <span className="meta">
                        {translate('quizWithCount', { count: course?.itemsCount?.[AssessmentTypes.QUIZ] || 0 })}
                      </span>
                      <span className="meta">
                        {translate('examWithCount', { count: course?.itemsCount?.[AssessmentTypes.EXAM] || 0 })}
                      </span>
                      <span className="meta">
                        {translate('pageWithCount', { count: course?.itemsCount?.[ModuleItemType.PAGE] || 0 })}
                      </span>
                    </LabelRow>
                    <div style={{ justifySelf: 'end' }}>
                      <Pill>
                        {translate('authoredBy')}
                        <b>{course.author.fullName}</b>
                      </Pill>
                    </div>
                  </Grid>
                  <CourseModuleList
                    course={course}
                    onDeleteModule={() => {
                      fetchCourse(course.id);
                    }}
                  />
                </div>
              </div>
            );
          }}
        </WebComponent>
        <CourseViewSidebar
          addStudentModal={addStudentModal}
          addCourseManagerModal={addCourseManagerModal}
          addDiscussionGroupModal={createDiscussionGroupModal}
        />
      </div>
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
