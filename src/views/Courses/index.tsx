import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import Empty from '../../components/Empty';
import useModal from '../../hooks/useModal';
import AddCourseModal from './AddCourseModal';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  const addCourseModal = useModal();
  const TITLE = 'CREATE A NEW COURSE';
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
      header="COURSES"
      actionBtnProps={{
        text: TITLE,
        onClick: addCourseModal.openModal,
      }}
    >
      <AddCourseModal useModal={addCourseModal} title={TITLE} />
      <Empty />
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;
