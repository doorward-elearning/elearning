import React, { useEffect } from 'react';
import './ViewElection.scss';
import { PageComponent } from '@doorward/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { fetchElectionAction } from '../../reducers/elections/actions';
import usePageResource from '../../hooks/usePageResource';
import Tools from '@doorward/common/utils/Tools';
import useRoutes from '../../hooks/useRoutes';
import { useRouteMatch } from 'react-router';
import WebComponent from '@doorward/ui/components/WebComponent';
import CandidateView from './CandidateView';
import useAuth from '@doorward/ui/hooks/useAuth';
import Pill from '@doorward/ui/components/Pill';
import Row from '@doorward/ui/components/Row';
import Button from '@doorward/ui/components/Buttons/Button';
import Grid from '@doorward/ui/components/Grid';
import moment from 'moment';
import hdate from 'human-date';
import Panel from '@doorward/ui/components/Panel';
import Header from '@doorward/ui/components/Header';
import CandidateResultView from './CandidateResultView';
import Plural from '@doorward/ui/components/Plural';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useAction from '@doorward/ui/hooks/useActions';

const ViewElection: React.FunctionComponent<ViewElectionProps> = (props): JSX.Element => {
  const { viewElection, vote } = useSelector((state: State) => state.elections);
  const routes = useRoutes();
  const match = useRouteMatch<{ electionId: string }>();
  const { isMember } = useAuth();
  const fetchElection = useAction(fetchElectionAction);

  usePageResource('electionId', fetchElectionAction);

  useFormSubmit(vote, () => {
    fetchElection(match.params.electionId);
  });

  useEffect(() => {
    if (viewElection.data?.election) {
      routes.setCurrentTitle(viewElection.data.election.title);
    }
  }, [viewElection]);

  const electionStarted = () => {
    return viewElection.data?.election && moment().isAfter(viewElection.data.election.startDate);
  };
  return (
    <Layout
      {...props}
      className="view-election-page"
      features={[
        LayoutFeatures.HEADER,
        !isMember() && !electionStarted() && LayoutFeatures.ACTION_BUTTON,
        LayoutFeatures.BACK_BUTTON,
        LayoutFeatures.BREAD_CRUMBS,
      ]}
      header={
        <Row>
          <h1>{Tools.str(viewElection?.data?.election?.title)}</h1>
          <div>
            <Pill>
              Created by - <b>{viewElection?.data?.election?.author?.fullName}</b>
            </Pill>
          </div>
        </Row>
      }
      actionBtnProps={{
        text: 'Add nominee',
        onClick: () => {
          routes.navigate(routes.addNominee, { electionId: match.params.electionId });
        },
      }}
    >
      <WebComponent data={viewElection.data?.election} loading={viewElection.fetching}>
        {election => {
          const started = moment().isAfter(election.startDate);
          const ended = moment().isAfter(election.endDate);
          const status = started ? (ended ? 'ended' : 'ongoing') : 'pending';
          const title = {
            ended: 'Ended ' + hdate.relativeTime(election.endDate),
            ongoing: 'Ends in ' + hdate.relativeTime(election.endDate),
            pending: 'Starts ' + hdate.relativeTime(election.startDate),
          };
          const totalVotes = (election.nominees || []).reduce((acc, cur) => acc + (cur.votes?.length || 0), 0);
          return (
            <div>
              <Panel style={{ marginBottom: 'var(--padding)' }}>
                <Grid columns={3} justifyContent="space-between" alignItems="center">
                  <div>
                    <h2>{started ? 'Started On: ' : 'Starts On: '}</h2>
                    <span>{Tools.normalDateTime(election.startDate)}</span>
                  </div>
                  <h2 className={`election-status ${status}`}>{title[status]}</h2>
                  <div style={{ justifySelf: 'end' }}>
                    <h2>{ended ? 'Ended On: ' : 'Ends On: '}</h2>
                    <span>{Tools.normalDateTime(election.startDate)}</span>
                  </div>
                </Grid>
              </Panel>
              <Row style={{ justifyContent: 'space-between' }}>
                <Header size={1} style={{ margin: 'var(--padding-xlg) 0' }}>
                  Results
                </Header>
                <Pill>{totalVotes === 0 ? 'No votes' : <Plural singular="total vote" count={totalVotes} />}</Pill>
              </Row>
              <CandidateResultView election={election} />

              <Row style={{ justifyContent: 'space-between' }}>
                <Header size={1} style={{ margin: 'var(--padding-xlg) 0' }}>
                  Nominees
                </Header>
                <Pill>
                  <Plural singular="Nominee" count={election.nominees?.length || 0} />
                </Pill>
              </Row>
              <WebComponent
                data={election?.nominees}
                loading={false}
                icon="people"
                emptyMessage="No nominees have been added yet."
              >
                {nominees => (
                  <div className="nominees-list">
                    {(nominees || []).map(nominee => {
                      return <CandidateView nominee={nominee} election={election} />;
                    })}
                  </div>
                )}
              </WebComponent>
            </div>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewElectionProps extends PageComponent {}

export default ViewElection;
