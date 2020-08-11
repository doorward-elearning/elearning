import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import AuthoredCoursesReportTable from '../../components/Tables/AuthoredCoursesReportTable';
import { fetchCourseCreatorReport } from '../../reducers/reports/actions';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '@doorward/ui/hooks/useBreadCrumbTitle';
import { PageComponent } from '@doorward/ui/types';

const ModeratorReport: FunctionComponent<ModeratorReportProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.reports.singleModerator);
  const routes = useRoutes();
  usePageResource('moderatorId', fetchCourseCreatorReport);
  useBreadCrumbTitle(state, state => state.data.moderator?.fullName, routes);

  const courseCreator = state.data.moderator;
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

export interface ModeratorReportProps extends PageComponent {}

export default ModeratorReport;
