import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CoursesInProgressTable from '../../components/Tables/CoursesInProgressTable';
import './StudentReport.scss';
import Panel from '@doorward/ui/components/Panel';
import WebComponent from '@doorward/ui/components/WebComponent';
import Grid from '@doorward/ui/components/Grid';
import Tools from '@doorward/common/utils/Tools';
import CustomChart from '@doorward/ui/components/CustomChart';
import Row from '@doorward/ui/components/Row';
import Badge from '@doorward/ui/components/Badge';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';

const data = [[translate('course'), translate('marks')]];

const StudentReport: React.FunctionComponent<StudentReportProps> = (props) => {
  const [grades, setGrades] = useState<Array<[string, number]>>([]);
  const [getStudentReport, studentReportState] = useApiAction(DoorwardApi, (api) => api.reports.getStudentReport);
  const {
    params: { studentId },
  } = useRouteMatch();

  useEffect(() => {
    if (studentId) {
      getStudentReport(studentId);
    }
  }, [studentId]);

  const [fetchCourses, coursesState] = useApiAction(DoorwardApi, (api) => api.courses.getCourses);
  const courses = coursesState.data?.courses;

  useEffect(() => {
    if (courses) {
      const newGrades: Array<[string, number]> = [
        ...Tools.truncate(courses, 10).map((course): [string, number] => [course.title, Tools.randomInt(20, 100)]),
      ];
      setGrades(newGrades);
    }
  }, [courses]);

  useEffect(() => {
    if (!courses) {
      fetchCourses();
    }
  }, []);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(studentReportState.data?.student?.fullName)}
      renderHeaderEnd={(): JSX.Element => (
        <Panel>
          <Header size={1}>98%</Header>
        </Panel>
      )}
    >
      <div className="student-report__page">
        <WebComponent data={grades} loading={!grades.length}>
          {() => (
            <Panel>
              <CustomChart
                chartType="ColumnChart"
                data={[...data, ...grades]}
                options={{
                  hAxis: {
                    title: translate('courses'),
                  },
                  vAxis: {
                    title: translate('grade'),
                  },
                  title: translate('courseGrades'),
                }}
                width="100%"
                height="400px"
              />
            </Panel>
          )}
        </WebComponent>
        <Row className="courses-information">
          <Grid columns={1}>
            <Header size={3}>
              <div>
                {translate('ongoingCourses')}
                <WebComponent
                  data={studentReportState.data?.student}
                  inline
                  loading={studentReportState.fetching}
                  loader={null}
                  empty={null}
                >
                  {(data) => <Badge>{data?.courses.length}</Badge>}
                </WebComponent>
              </div>
            </Header>
            <WebComponent
              icon="school"
              data={studentReportState.data?.student?.courses}
              loading={studentReportState.fetching}
              message={translate('noOngoingCourses')}
              size="medium"
            >
              {(data): JSX.Element => <CoursesInProgressTable courses={data} />}
            </WebComponent>
          </Grid>
          <Grid columns={1}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Header size={3}>
                <div>
                  {translate('completedCourses')}
                  <WebComponent
                    data={studentReportState.data?.student}
                    inline
                    loading={studentReportState.fetching}
                    loader={null}
                    empty={null}
                  >
                    {(data): JSX.Element => <Badge>{data?.courses.length}</Badge>}
                  </WebComponent>
                </div>
              </Header>
            </Row>
            <WebComponent
              icon="school"
              data={studentReportState.data?.student?.courses}
              loading={studentReportState.fetching}
              message={translate('noCompletedCourses')}
              size="medium"
            >
              {(data): JSX.Element => <CoursesInProgressTable courses={data} />}
            </WebComponent>
          </Grid>
        </Row>
      </div>
    </Layout>
  );
};

export interface StudentReportProps extends PageComponent {}

export default StudentReport;
