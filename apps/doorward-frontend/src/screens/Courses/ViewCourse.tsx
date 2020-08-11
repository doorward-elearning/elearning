import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { match } from 'react-router';
import './Courses.scss';
import CourseModuleList from '../../components/Lists/CourseModuleList';
import CourseViewSidebar from '../../components/CourseViewSidebar';
import useViewCourse from '../../hooks/useViewCourse';
import ChooseMemberModal from '../../components/Modals/ChooseMemberModal';
import AddCourseModuleModal from '../../components/Modals/AddCourseModuleModal';
import EditableLabelForm from '../../components/Forms/EditableLabelForm';
import { startLiveClassroom, updateCourseAction } from '../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import CourseViewMenu from '../../components/Dropdowns/CourseViewMenu';
import ProgressModal from '../../components/Modals/ProgressModal';
import useRoutes from '../../hooks/useRoutes';
import useEventListener from '../../hooks/useEventListener';
import { LIVE_CLASSROOM_STARTED } from '../../reducers/socket/types';
import WebComponent from '@doorward/ui/components/WebComponent';
import LabelRow from '@doorward/ui/components/LabelRow';
import Button from '@doorward/ui/components/Buttons/Button';
import { ModalFeatures } from '@doorward/ui/components/Modal';
import useModal from '@doorward/ui/hooks/useModal';
import IfElse from '@doorward/ui/components/IfElse';
import { Roles } from '@doorward/ui/components/RolesManager';
import { PageComponent } from '@doorward/ui/types';
import { Link } from 'react-router-dom';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import useRoleManager from '@doorward/ui/hooks/useRoleManager';
import { fetchTeacherListAction } from '../../reducers/teachers/actions';
import ChooseCourseManagerModal from '../../components/Modals/ChooseCourseManagerModal';
import useAction from '@doorward/ui/hooks/useActions';
import Pill from '@doorward/ui/components/Pill';
import Grid from '@doorward/ui/components/Grid';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const addModuleModal = useModal(false);
  const addMemberModal = useModal(false);
  const addCourseManagerModal = useModal(false);
  const liveClassroomModal = useModal(false);
  const isAdmin = useRoleManager();
  const fetchTeachers = useAction(fetchTeacherListAction);

  useEffect(() => {
    if (isAdmin) {
      fetchTeachers();
    }
  }, [isAdmin]);

  const liveClassroom: any = useEventListener(LIVE_CLASSROOM_STARTED);

  useEffect(() => {}, []);

  const [courseId, course] = useViewCourse();
  const routes = useRoutes();

  const updateCourse = useSelector((state: State) => state.courses.updateCourse);
  const launchClassroom = useSelector((state: State) => state.courses.launchClassroom);
  const teacherList = useSelector((state: State) => state.teachers.teacherList);
  return (
    <Layout
      {...props}
      className="view-course"
      noNavBar
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={
        <IfElse condition={course.data.course}>
          <React.Fragment>
            <EditableLabelForm
              submitAction={updateCourseAction}
              state={updateCourse}
              name="title"
              roles={[Roles.TEACHER]}
              createData={values => [courseId, values]}
              value={course.data.course?.title}
            />
          </React.Fragment>
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
            <IfElse condition={liveClassroom?.courseId || course.data.course?.meetingRoom?.currentMeeting}>
              <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                Join live classroom
              </Button>
              <RoleContainer roles={[Roles.TEACHER]}>
                <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                  Start live classroom
                </Button>
              </RoleContainer>
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
                <ChooseMemberModal
                  courseId={course.id}
                  className="choose__member__modal"
                  onSuccess={addMemberModal.closeModal}
                  useModal={addMemberModal}
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
                <div className="view-course__module-list">
                  <Grid columns={2} justifyContent="space-between">
                    <LabelRow>
                      <span className="meta">{course.modules.length} Modules</span>
                      <Link to={routes.assignmentList.link} className="meta">
                        {course.itemCount.assignments} Assignments
                      </Link>
                      <span className="meta">{course.itemCount.quizzes} Quizzes</span>
                      <span className="meta">{course.itemCount.pages} Pages</span>
                    </LabelRow>
                    <div style={{ justifySelf: 'end' }}>
                      <Pill>
                        Authored by - <b>{course.author.fullName}</b>
                      </Pill>
                    </div>
                  </Grid>
                  <CourseModuleList course={course} />
                </div>
              </div>
            );
          }}
        </WebComponent>
        <CourseViewSidebar addMemberModal={addMemberModal} addCourseManagerModal={addCourseManagerModal} />
      </div>
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
