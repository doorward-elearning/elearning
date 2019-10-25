import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  return <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} header="View Course" />;
};

export interface ViewCourseProps extends PageComponent {}

export default ViewCourse;
