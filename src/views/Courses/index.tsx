import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import useModal from '../../hooks/useModal';
import Empty from '../../components/ui/Empty';
import AddCourseModal from './AddCourseModal';
import ROUTES from '../../routes/routes';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  const addCourseModal = useModal(props.location.pathname === ROUTES.createCourse.link);

  const TITLE = 'CREATE A NEW COURSE';
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header="COURSES"
      actionBtnProps={{
        text: TITLE,
        onClick: () => props.history.push(ROUTES.createCourse.link),
      }}
    >
      <AddCourseModal history={props.history} useModal={addCourseModal} title={TITLE} />
      <Empty />
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;
