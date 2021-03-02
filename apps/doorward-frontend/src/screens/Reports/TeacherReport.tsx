import React, { FunctionComponent, useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AuthoredCoursesReportTable from '../../components/Tables/AuthoredCoursesReportTable';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';
import { useRouteMatch } from 'react-router';

const TeacherReport: FunctionComponent<TeacherReportProps> = (props): JSX.Element => {
  const [getTeacherReport, teacherReport] = useApiAction(DoorwardApi, (api) => api.reports.getTeacherReport);
  const {
    params: { teacherId },
  } = useRouteMatch();

  useEffect(() => {
    if (teacherId) {
      getTeacherReport(teacherId);
    }
  }, [teacherId]);

  const courseCreator = teacherReport.data?.teacher;
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
