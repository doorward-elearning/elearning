import React, { useEffect, useState } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import { fetchStudentReport } from '../../reducers/reports/actions';
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
import CustomChart from '../../components/ui/CustomChart';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '../../hooks/useBreadCrumbTitle';
import useAction from '../../hooks/useActions';
import { fetchCoursesAction } from '../../reducers/courses/actions';

const data = [['Course', 'Marks']];
const StudentReport: React.FunctionComponent<StudentReportProps> = props => {
  const [grades, setGrades] = useState<Array<[string, number]>>([]);
  const state = useSelector((state: State) => state.reports.singleStudent);
  const courses = useSelector((state: State) => state.courses.courseList.data?.courses);

  usePageResource('studentId', fetchStudentReport);
  const fetchCourses = useAction(fetchCoursesAction);
  useBreadCrumbTitle(state, state => state.data.student?.fullName);

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
                  {data => <Badge>{data.coursesInProgress.length}</Badge>}
                </WebComponent>
              </div>
            </Header>
            <WebComponent
              icon="school"
              data={state.data.student?.coursesInProgress}
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
                    {(data): JSX.Element => <Badge>{data.coursesInProgress.length}</Badge>}
                  </WebComponent>
                </div>
              </Header>
            </Row>
            <WebComponent
              icon="school"
              data={state.data.student?.coursesInProgress}
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
