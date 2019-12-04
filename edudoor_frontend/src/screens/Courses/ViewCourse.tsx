import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import ROUTES from '../../routes/routes';
import { match, Redirect } from 'react-router';
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
import { updateCourseAction } from '../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import CourseViewMenu from '../../components/static/Dropdowns/CourseViewMenu';
import LabelRow from '../../components/ui/LabelRow';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);

  const [courseId, course] = useViewCourse();

  const updateCourse = useSelector((state: State) => state.courses.updateCourse);
  return (
    <IfElse condition={!!course.errors.message}>
      <Redirect to={ROUTES.courseList.link} />
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
              <Button icon="phone" mini>
                Live classroom
              </Button>
              <CourseViewMenu />
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
    </IfElse>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
