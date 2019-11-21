import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import Tools from '../../utils/Tools';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '../../components/ui/WebComponent';
import AuthoredCoursesReportTable from '../../components/static/Tables/AuthoredCoursesReportTable';
import { fetchCourseCreatorReport } from '../../reducers/reports/actions';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '../../hooks/useBreadCrumbTitle';

const CourseCreatorReport: FunctionComponent<CourseCreatorReportProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.reports.singleCourseCreator);
  usePageResource('teacherId', fetchCourseCreatorReport);
  useBreadCrumbTitle(state, state => state.data.courseCreator?.fullName);

  const courseCreator = state.data.courseCreator;
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(courseCreator?.fullName)}
    >
      <WebComponent data={courseCreator} loading={state.fetching}>
        {data => (
          <div className="course-creator-report__content">
            <AuthoredCoursesReportTable courses={data.authoredCourses} />
          </div>
        )}
      </WebComponent>
    </Layout>
  );
};

export interface CourseCreatorReportProps extends PageComponent {}

export default CourseCreatorReport;
