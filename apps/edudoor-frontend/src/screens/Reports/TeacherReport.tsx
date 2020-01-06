import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import AuthoredCoursesReportTable from '../../components/Tables/AuthoredCoursesReportTable';
import { fetchCourseCreatorReport } from '../../reducers/reports/actions';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Tools from '@edudoor/ui/utils/Tools';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import useBreadCrumbTitle from '@edudoor/ui/hooks/useBreadCrumbTitle';
import { PageComponent } from '@edudoor/ui/types';

const TeacherReport: FunctionComponent<TeacherReportProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.reports.singleTeacher);
  const routes = useRoutes();
  usePageResource('teacherId', fetchCourseCreatorReport, routes);
  useBreadCrumbTitle(state, state => state.data.teacher?.fullName, routes);

  const courseCreator = state.data.teacher;
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

export interface TeacherReportProps extends PageComponent {}

export default TeacherReport;
