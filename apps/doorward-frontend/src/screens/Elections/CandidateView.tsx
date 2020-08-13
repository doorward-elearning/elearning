import React, { useState } from 'react';
import './CandidateView.scss';
import { ElectionNominees } from '@doorward/common/models/ElectionNominees';
import Card from '@doorward/ui/components/Card';
import EImage from '@doorward/ui/components/Image';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import useAuth from '@doorward/ui/hooks/useAuth';
import Button from '@doorward/ui/components/Buttons/Button';
import { Election } from '@doorward/common/models/Election';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@doorward/ui/hooks/useActions';
import { voteElectionAction } from '../../reducers/elections/actions';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import moment from 'moment';

const CandidateView: React.FunctionComponent<CandidateViewProps> = (props): JSX.Element => {
  const { isMember, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const { nominee, election } = props;
  const { vote } = useSelector((state: State) => state.elections);

  const voteElection = useAction(voteElectionAction);

  const hasVoted = election.nominees.find(nominee => nominee.votes.find(vote => vote.voterId === user.id));

  useFormSubmit(vote, () => {
    setSubmitting(false);
  });

  const electionStarted = moment().isAfter(election.startDate);
  const electionEnded = moment().isAfter(election.endDate);

  return (
    <div className="candidate-view">
      <Card>
        <Card.Body>
          <div className="candidate-view__profile">
            <EImage src={nominee.profilePicture} circle size="large" />
            <h1>{nominee.name}</h1>
            {isMember() && !hasVoted && electionStarted && !electionEnded && (
              <Button
                loading={vote.submitting && submitting}
                onClick={() => {
                  setSubmitting(true);
                  voteElection(props.election.id, props.nominee.id);
                }}
              >
                Vote
              </Button>
            )}
            <div className="profile">
              <DraftHTMLContent content={JSON.parse(nominee.profile)} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export interface CandidateViewProps {
  nominee: ElectionNominees;
  election: Election;
}

export default CandidateView;
