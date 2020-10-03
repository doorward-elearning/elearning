import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { match } from 'react-router';
import './Courses.scss';
import CourseModuleList from '../../components/Lists/CourseModuleList';
import CourseViewSidebar from '../../components/CourseViewSidebar';
import useViewCourse from '../../hooks/useViewCourse';
import ChooseStudentModal from '../../components/Modals/ChooseStudentModal';
import AddCourseModuleModal from '../../components/Modals/AddCourseModuleModal';
import EditableLabelForm from '../../components/Forms/EditableLabelForm';
import CourseViewMenu from '../../components/Dropdowns/CourseViewMenu';
import ProgressModal from '../../components/Modals/ProgressModal';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import Button from '@doorward/ui/components/Buttons/Button';
import { ModalFeatures } from '@doorward/ui/components/Modal';
import useModal from '@doorward/ui/hooks/useModal';
import IfElse from '@doorward/ui/components/IfElse';
import { PageComponent } from '@doorward/ui/types';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import ChooseCourseManagerModal from '../../components/Modals/ChooseCourseManagerModal';
import useAction from '@doorward/ui/hooks/useActions';
import Pill from '@doorward/ui/components/Pill';
import Grid from '@doorward/ui/components/Grid';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import { Link } from 'react-router-dom';
import LabelRow from '@doorward/ui/components/LabelRow';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = (props) => {
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);
  const addCourseManagerModal = useModal(false);
  const liveClassroomModal = useModal(false);
  const hasPrivileges = usePrivileges();
  const fetchTeachers = useAction(DoorwardApi.teachers.getAllTeachers);

  useEffect(() => {
    if (hasPrivileges('teachers.list')) {
      fetchTeachers();
    }
  }, []);

  useEffect(() => {}, []);

  const [courseId, course] = useViewCourse();
  const routes = useRoutes();

  const updateCourse = useDoorwardApi((state) => state.courses.updateCourse);
  const launchClassroom = useDoorwardApi((state) => state.meetings.joinMeeting);
  const teacherList = useDoorwardApi((state) => state.teachers.getAllTeachers);
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
              submitAction={DoorwardApi.courses.updateCourse}
              state={updateCourse}
              name="title"
              privileges={['courses.update']}
              createData={(values) => [courseId, values]}
              value={course.data.course?.title}
            />
          </React.Fragment>
        </IfElse>
      }
      renderHeaderEnd={(): JSX.Element => {
        return (
          <React.Fragment>
            <RoleContainer privileges={['modules.create']}>
              <Button onClick={addModuleModal.openModal} bordered>
                Add Module
              </Button>
            </RoleContainer>
            <IfElse condition={course.data.course?.meetingRoom?.currentMeeting}>
              <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                Join live classroom
              </Button>
              <RoleContainer privileges={['courses.start-meeting']}>
                <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                  Start live classroom
                </Button>
              </RoleContainer>
            </IfElse>
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => DoorwardApi.meetings.joinMeeting(courseId)}
              title="Starting classroom"
              useModal={liveClassroomModal}
              onSuccess={(data) => {
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
                <div className="view-course__module-list">
                  <Grid columns={2} justifyContent="space-between">
                    <LabelRow>
                      <span className="meta">{course.modules.length} Modules</span>
                      <Link to={routes.assignmentList.link} className="meta">
                        {course?.itemsCount?.Assignment || 0} Assignments
                      </Link>
                      <span className="meta">{course?.itemsCount?.Quiz || 0} Quizzes</span>
                      <span className="meta">{course?.itemsCount?.Page || 0} Pages</span>
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
        <CourseViewSidebar addStudentModal={addStudentModal} addCourseManagerModal={addCourseManagerModal} />
      </div>
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
