import React, { useEffect } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import useAction from '../../hooks/useActions';
import { fetchStudentReport } from '../../reducers/reports/actions';
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import Tools from '../../utils/Tools';
import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';
import Row from '../../components/ui/Row';
import CoursesInProgressTable from '../../components/static/Tables/CoursesInProgressTable';
import WebComponent from '../../components/ui/WebComponent';
import './StudentReport.scss';

const StudentReport: React.FunctionComponent<StudentReportProps> = props => {
  const action = useAction(fetchStudentReport);
  const match: any = useRouteMatch();

  useEffect(() => {
    action(match.params.studentId);
  }, []);
  const state = useSelector((state: State) => state.reports.singleStudent);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(state.data?.student?.fullName)}
    >
      <div className="student-report__page">
        <Row>
          <Card>
            <Card.Body>
              <div>
                <Header size={2} thin>
                  Average Grade
                </Header>
                <Header size={1}>98%</Header>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>
                <Header size={2} thin>
                  Number of courses completed
                </Header>
                <Header size={1}>9</Header>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div>
                <Header size={2} thin>
                  Number of courses in progress
                </Header>
                <Header size={1}>9</Header>
              </div>
            </Card.Body>
          </Card>
        </Row>
        <Row className="courses-information">
          <Card>
            <Card.Header>
              <Header size={3}>Ongoing Courses</Header>
            </Card.Header>
            <Card.Body>
              <WebComponent
                icon="school"
                data={state.data.student?.coursesInProgress}
                loading={state.fetching}
                message="The student does not have any ongoing courses."
                size="medium"
              >
                {data => <CoursesInProgressTable courses={data} />}
              </WebComponent>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Header size={3}>Completed Courses</Header>
            </Card.Header>
            <Card.Body>
              <WebComponent
                icon="school"
                data={state.data.student?.coursesInProgress}
                loading={state.fetching}
                message="The student has not completed any courses."
                size="medium"
              >
                {data => <CoursesInProgressTable courses={data} />}
              </WebComponent>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Layout>
  );
};

export interface StudentReportProps extends PageComponent {}

export default StudentReport;
