import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import CoursesInProgressTable from '../../components/Tables/CoursesInProgressTable';
import './StudentReport.scss';
import useRoutes from '../../hooks/useRoutes';
import Panel from '@doorward/ui/components/Panel';
import WebComponent from '@doorward/ui/components/WebComponent';
import Grid from '@doorward/ui/components/Grid';
import Tools from '@doorward/common/utils/Tools';
import useAction from '@doorward/ui/hooks/useActions';
import CustomChart from '@doorward/ui/components/CustomChart';
import Row from '@doorward/ui/components/Row';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '@doorward/ui/hooks/useBreadCrumbTitle';
import Badge from '@doorward/ui/components/Badge';
import { PageComponent } from '@doorward/ui/types';
import Header from '@doorward/ui/components/Header';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';

const data = [['Course', 'Marks']];

const StudentReport: React.FunctionComponent<StudentReportProps> = (props) => {
  const [grades, setGrades] = useState<Array<[string, number]>>([]);
  const state = useDoorwardApi((state) => state.reports.getStudentReport);
  const courses = useDoorwardApi((state) => state.courses.getCourses.data?.courses);
  const routes = useRoutes();

  usePageResource('studentId', DoorwardApi.reports.getStudentReport);
  const fetchCourses = useAction(DoorwardApi.courses.getCourses);
  useBreadCrumbTitle(state, (state) => state.data.student?.fullName, routes);

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
      header={Tools.str(state.data?.student?.fullName)}
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
                    title: 'Courses',
                  },
                  vAxis: {
                    title: 'Grade',
                  },
                  title: 'Course Grades',
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
                Ongoing Courses{' '}
                <WebComponent data={state.data.student} inline loading={state.fetching} loader={null} empty={null}>
                  {(data) => <Badge>{data.courses.length}</Badge>}
                </WebComponent>
              </div>
            </Header>
            <WebComponent
              icon="school"
              data={state.data.student?.courses}
              loading={state.fetching}
              message="The student does not have any ongoing courses."
              size="medium"
            >
              {(data): JSX.Element => <CoursesInProgressTable courses={data} />}
            </WebComponent>
          </Grid>
          <Grid columns={1}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Header size={3}>
                <div>
                  Completed Courses{' '}
                  <WebComponent data={state.data.student} inline loading={state.fetching} loader={null} empty={null}>
                    {(data): JSX.Element => <Badge>{data.courses.length}</Badge>}
                  </WebComponent>
                </div>
              </Header>
            </Row>
            <WebComponent
              icon="school"
              data={state.data.student?.courses}
              loading={state.fetching}
              message="The student has not completed any courses."
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
