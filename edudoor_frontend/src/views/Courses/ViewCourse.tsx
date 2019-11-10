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

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);

  const [, course] = useViewCourse();

  return (
    <IfElse condition={!!course.errors.message}>
      <Redirect to={ROUTES.courseList.link} />
      <Layout
        {...props}
        className="view-course"
        noNavBar
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
        header={course.data.course && course.data.course.title}
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
                    <Button onClick={addModuleModal.openModal}>Add Module</Button>
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
