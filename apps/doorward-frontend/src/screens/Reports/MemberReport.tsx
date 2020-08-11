import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { fetchMemberReport } from '../../reducers/reports/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import CoursesInProgressTable from '../../components/Tables/CoursesInProgressTable';
import './MemberReport.scss';
import { fetchCoursesAction } from '../../reducers/courses/actions';
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

const data = [['Course', 'Marks']];
const MemberReport: React.FunctionComponent<MemberReportProps> = props => {
  const [grades, setGrades] = useState<Array<[string, number]>>([]);
  const state = useSelector((state: State) => state.reports.singleMember);
  const courses = useSelector((state: State) => state.courses.courseList.data?.courses);
  const routes = useRoutes();

  usePageResource('memberId', fetchMemberReport);
  const fetchCourses = useAction(fetchCoursesAction);
  useBreadCrumbTitle(state, state => state.data.member?.fullName, routes);

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
      header={Tools.str(state.data?.member?.fullName)}
      renderHeaderEnd={(): JSX.Element => (
        <Panel>
          <Header size={1}>98%</Header>
        </Panel>
      )}
    >
      <div className="member-report__page">
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
                <WebComponent data={state.data.member} inline loading={state.fetching} loader={null} empty={null}>
                  {data => <Badge>{data.coursesInProgress.length}</Badge>}
                </WebComponent>
              </div>
            </Header>
            <WebComponent
              icon="school"
              data={state.data.member?.coursesInProgress}
              loading={state.fetching}
              message="The member does not have any ongoing courses."
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
                  <WebComponent data={state.data.member} inline loading={state.fetching} loader={null} empty={null}>
                    {(data): JSX.Element => <Badge>{data.coursesInProgress.length}</Badge>}
                  </WebComponent>
                </div>
              </Header>
            </Row>
            <WebComponent
              icon="school"
              data={state.data.member?.coursesInProgress}
              loading={state.fetching}
              message="The member has not completed any courses."
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

export interface MemberReportProps extends PageComponent {}

export default MemberReport;
