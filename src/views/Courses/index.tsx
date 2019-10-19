import React from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import Empty from '../../components/Empty';

const Courses: React.FunctionComponent<CoursesProps> = props => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]} header="COURSES" actionBtnProps={{
      text: 'ADD COURSE'
    }}>
      <Empty />
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;
