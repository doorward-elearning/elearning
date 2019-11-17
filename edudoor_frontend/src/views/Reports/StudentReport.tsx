import React, { useContext, useEffect } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import useAction from '../../hooks/useActions';
import { fetchStudentReport } from '../../reducers/reports/actions';
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Tools from '../../utils/Tools';
import Header from '../../components/ui/Header';
import Row from '../../components/ui/Row';
import CoursesInProgressTable from '../../components/static/Tables/CoursesInProgressTable';
import WebComponent from '../../components/ui/WebComponent';
import './StudentReport.scss';
import Panel from '../../components/ui/Panel';
import Grid from '../../components/ui/Grid';
import Badge from '../../components/ui/Badge';
import useRoutes from '../../hooks/useRoutes';
import CustomChart from '../../components/ui/CustomChart';

const data = [
  ['Course', 'Marks'],
  ['Maths', 88],
  ['Physics', 72],
  ['English', 64],
  ['Chemistry', 90],
  ['Geography', 47],
  ['Biology', 65],
  ['Calculus', 80],
  ['Business Studies', 77],
];
const StudentReport: React.FunctionComponent<StudentReportProps> = props => {
  const action = useAction(fetchStudentReport);
  const match: any = useRouteMatch();
  const routes = useRoutes();

  useEffect(() => {
    action(match.params.studentId);
  }, []);
  const state = useSelector((state: State) => state.reports.singleStudent);
  useEffect(() => {
    if (state.data.student) {
      routes.setTitle(routes.studentReport.id, state.data.student.fullName);
    }
  }, [state.data]);

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
        <Panel>
          <CustomChart
            chartType="ColumnChart"
            data={data}
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
        <Row className="courses-information">
          <Grid columns={1}>
            <Header size={3}>
              <div>
                Ongoing Courses{' '}
                <WebComponent data={state.data.student} inline loading={state.fetching} loader={null} empty={null}>
                  {data => <Badge>{data.coursesInProgress.length}</Badge>}
                </WebComponent>
              </div>
            </Header>
            <Panel>
              <WebComponent
                icon="school"
                data={state.data.student?.coursesInProgress}
                loading={state.fetching}
                message="The student does not have any ongoing courses."
                size="medium"
              >
                {(data): JSX.Element => <CoursesInProgressTable courses={data} />}
              </WebComponent>
            </Panel>
          </Grid>
          <Grid columns={1}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Header size={3}>
                <div>
                  Completed Courses{' '}
                  <WebComponent data={state.data.student} inline loading={state.fetching} loader={null} empty={null}>
                    {(data): JSX.Element => <Badge>{data.coursesInProgress.length}</Badge>}
                  </WebComponent>
                </div>
              </Header>
            </Row>
            <Panel>
              <WebComponent
                icon="school"
                data={state.data.student?.coursesInProgress}
                loading={state.fetching}
                message="The student has not completed any courses."
                size="medium"
              >
                {(data): JSX.Element => <CoursesInProgressTable courses={data} />}
              </WebComponent>
            </Panel>
          </Grid>
        </Row>
      </div>
    </Layout>
  );
};

export interface StudentReportProps extends PageComponent {}

export default StudentReport;
