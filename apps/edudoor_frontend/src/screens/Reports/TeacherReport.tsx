import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../../../../libs/ui/types';
import Tools from '../../../../../libs/ui/utils/Tools';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '../../../../../libs/ui/components/WebComponent';
import AuthoredCoursesReportTable from '../../components/Tables/AuthoredCoursesReportTable';
import { fetchCourseCreatorReport } from '../../reducers/reports/actions';
import usePageResource from '../../../../../libs/ui/hooks/usePageResource';
import useBreadCrumbTitle from '../../../../../libs/ui/hooks/useBreadCrumbTitle';

const TeacherReport: FunctionComponent<TeacherReportProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.reports.singleTeacher);
  usePageResource('teacherId', fetchCourseCreatorReport);
  useBreadCrumbTitle(state, state => state.data.teacher?.fullName);

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
