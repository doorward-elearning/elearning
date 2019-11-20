import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import Tools from '../../utils/Tools';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '../../components/ui/WebComponent';

const CourseCreatorReport: FunctionComponent<CourseCreatorReportProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.reports.singleCourseCreator);
  const courseCreator = state.data.courseCreator;
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(courseCreator?.fullName)}
    >
      Course creator
    </Layout>
  );
};

export interface CourseCreatorReportProps extends PageComponent {}

export default CourseCreatorReport;
