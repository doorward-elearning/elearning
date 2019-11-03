import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import ROUTES from '../../routes/routes';
import { match, Redirect } from 'react-router';
import useModal from '../../hooks/useModal';
import { ModalFeatures } from '../../components/ui/Modal';
import WebComponent from '../../components/ui/WebComponent';
import Panel from '../../components/ui/Panel';
import HtmlContent from '../../components/ui/HtmlContent';
import './Courses.scss';
import CourseModuleList from '../../components/static/Lists/CourseModuleList';
import Row from '../../components/ui/Row';
import CourseViewSidebar from '../../components/static/CourseViewSidebar';
import IfElse from '../../components/ui/IfElse';
import useViewCourse from '../../hooks/useViewCourse';
import ChooseStudentModal from '../../components/static/Modals/ChooseStudentModal';
import AddCourseModuleModal from '../../components/static/Modals/AddCourseModuleModal';

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
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
        header={course.data.course && course.data.course.title}
        actionBtnProps={{ text: 'Add Module', onClick: addModuleModal.openModal }}
      >
        <Row
          style={{
            gridTemplateColumns: '1fr 300px',
            alignItems: 'start',
            gridGap: 'var(--padding-lg)',
            marginTop: 'var(--padding-lg)',
          }}
        >
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
                    useModal={addStudentModal}
                    features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                  />
                  <Panel className="course-description" plain>
                    <HtmlContent html={course.description} />
                  </Panel>
                  <CourseModuleList course={course} />
                </div>
              );
            }}
          </WebComponent>
          <CourseViewSidebar addStudentModal={addStudentModal} />
        </Row>
      </Layout>
    </IfElse>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
