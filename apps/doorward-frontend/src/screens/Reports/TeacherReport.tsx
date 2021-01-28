import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AuthoredCoursesReportTable from '../../components/Tables/AuthoredCoursesReportTable';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '@doorward/ui/hooks/useBreadCrumbTitle';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';

const TeacherReport: FunctionComponent<TeacherReportProps> = (props): JSX.Element => {
  const [getTeacherReport, teacherReport] = useApiAction(DoorwardApi, (api) => api.reports.getTeacherReport);
  const routes = useRoutes();
  usePageResource('teacherId', getTeacherReport);
  useBreadCrumbTitle(teacherReport, (state) => state.data.teacher?.fullName, routes);

  const courseCreator = teacherReport.data.teacher;
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(courseCreator?.fullName)}
    >
      <WebComponent data={courseCreator} loading={teacherReport.fetching}>
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
