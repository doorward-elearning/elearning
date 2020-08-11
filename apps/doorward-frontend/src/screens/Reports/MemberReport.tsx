import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { fetchMemberReport } from '../../reducers/reports/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import ConferencesInProgressTable from '../../components/Tables/ConferencesInProgressTable';
import './MemberReport.scss';
import { fetchConferencesAction } from '../../reducers/conferences/actions';
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

const data = [['Conference', 'Marks']];
const MemberReport: React.FunctionComponent<MemberReportProps> = props => {
  const [grades, setGrades] = useState<Array<[string, number]>>([]);
  const state = useSelector((state: State) => state.reports.singleMember);
  const conferences = useSelector((state: State) => state.conferences.conferenceList.data?.conferences);
  const routes = useRoutes();

  usePageResource('memberId', fetchMemberReport);
  const fetchConferences = useAction(fetchConferencesAction);
  useBreadCrumbTitle(state, state => state.data.member?.fullName, routes);

  useEffect(() => {
    if (conferences) {
      const newGrades: Array<[string, number]> = [
        ...Tools.truncate(conferences, 10).map((conference): [string, number] => [conference.title, Tools.randomInt(20, 100)]),
      ];
      setGrades(newGrades);
    }
  }, [conferences]);

  useEffect(() => {
    if (!conferences) {
      fetchConferences();
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
                    title: 'Conferences',
                  },
                  vAxis: {
                    title: 'Grade',
                  },
                  title: 'Conference Grades',
                }}
                width="100%"
                height="400px"
              />
            </Panel>
          )}
        </WebComponent>
        <Row className="conferences-information">
          <Grid columns={1}>
            <Header size={3}>
              <div>
                Ongoing Conferences{' '}
                <WebComponent data={state.data.member} inline loading={state.fetching} loader={null} empty={null}>
                  {data => <Badge>{data.conferencesInProgress.length}</Badge>}
                </WebComponent>
              </div>
            </Header>
            <WebComponent
              icon="school"
              data={state.data.member?.conferencesInProgress}
              loading={state.fetching}
              message="The member does not have any ongoing conferences."
              size="medium"
            >
              {(data): JSX.Element => <ConferencesInProgressTable conferences={data} />}
            </WebComponent>
          </Grid>
          <Grid columns={1}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Header size={3}>
                <div>
                  Completed Conferences{' '}
                  <WebComponent data={state.data.member} inline loading={state.fetching} loader={null} empty={null}>
                    {(data): JSX.Element => <Badge>{data.conferencesInProgress.length}</Badge>}
                  </WebComponent>
                </div>
              </Header>
            </Row>
            <WebComponent
              icon="school"
              data={state.data.member?.conferencesInProgress}
              loading={state.fetching}
              message="The member has not completed any conferences."
              size="medium"
            >
              {(data): JSX.Element => <ConferencesInProgressTable conferences={data} />}
            </WebComponent>
          </Grid>
        </Row>
      </div>
    </Layout>
  );
};

export interface MemberReportProps extends PageComponent {}

export default MemberReport;
