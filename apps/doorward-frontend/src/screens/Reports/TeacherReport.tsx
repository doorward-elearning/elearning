import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AuthoredCoursesReportTable from '../../components/Tables/AuthoredCoursesReportTable';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '@doorward/ui/hooks/useBreadCrumbTitle';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';

const TeacherReport: FunctionComponent<TeacherReportProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.reports.getTeacherReport);
  const routes = useRoutes();
  usePageResource('teacherId', DoorwardApi.reports.getTeacherReport);
  useBreadCrumbTitle(state, (state) => state.data.teacher?.fullName, routes);

  const courseCreator = state.data.teacher;
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(courseCreator?.fullName)}
    >
      <WebComponent data={courseCreator} loading={state.fetching}>
        {(data) => (
          <div className="course-creator-report__content">
            <AuthoredCoursesReportTable courses={data?.courses} />
          </div>
        )}
      </WebComponent>
    </Layout>
  );
};

export interface TeacherReportProps extends PageComponent {}

export default TeacherReport;
