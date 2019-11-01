import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import ROUTES from '../../routes/routes';
import useRoutes from '../../hooks/useRoutes';
import { useSelector } from 'react-redux';
import { match } from 'react-router';
import useAction from '../../hooks/useActions';
import { fetchCourseAction } from '../../reducers/courses/actions';
import Button from '../../components/ui/Buttons/Button';
import useModal from '../../hooks/useModal';
import { ModalFeatures } from '../../components/ui/Modal';
import AddModuleForm from '../../components/static/Forms/AddModuleForm';
import AddStudentForm from '../../components/static/Forms/AddStudentForm';
import WebComponent from '../../components/ui/WebComponent';
import Panel from '../../components/ui/Panel';
import HtmlContent from '../../components/ui/HtmlContent';
import './Courses.scss';
import { State } from '../../store';
import CourseModuleList from '../../components/static/Lists/CourseModuleList';
import Row from '../../components/ui/Row';
import CourseViewSidebar from '../../components/static/CourseViewSidebar';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const { setTitle } = useRoutes();
  const fetchCourse = useAction(fetchCourseAction);
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);
  const courseId = +props.match.params.courseId;

  useEffect(() => {
    fetchCourse(courseId);
  }, []);

  const course = useSelector((state: State) => state.courses.viewCourse);

  return (
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
            setTitle(ROUTES.viewCourse.id, course.title);
            return (
              <div>
                <AddModuleForm
                  courseId={course.id}
                  useModal={addModuleModal}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                />
                <AddStudentForm
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
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
