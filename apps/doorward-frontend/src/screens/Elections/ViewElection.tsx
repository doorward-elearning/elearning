import React, { useEffect } from 'react';
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

const ViewElection: React.FunctionComponent<ViewElectionProps> = (props): JSX.Element => {
  const { viewElection } = useSelector((state: State) => state.elections);
  const routes = useRoutes();
  const match = useRouteMatch<{ electionId: string }>();
  const { isMember } = useAuth();

  usePageResource('electionId', fetchElectionAction);

  useEffect(() => {
    if (viewElection.data?.election) {
      routes.setCurrentTitle(viewElection.data.election.title);
    }
  }, [viewElection]);
  return (
    <Layout
      {...props}
      features={[
        LayoutFeatures.HEADER,
        !isMember() && LayoutFeatures.ACTION_BUTTON,
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
          return (
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
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewElectionProps extends PageComponent {}

export default ViewElection;
