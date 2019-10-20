import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import Empty from '../../components/Empty';
import useModal from '../../hooks/useModal';
import AddCourseModal from './AddCourseModal';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  const addCourseModal = useModal();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
      header="COURSES"
      actionBtnProps={{
        text: 'ADD COURSE',
        onClick: addCourseModal.openModal,
      }}
    >
      <AddCourseModal useModal={addCourseModal} />
      <Empty />
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;
