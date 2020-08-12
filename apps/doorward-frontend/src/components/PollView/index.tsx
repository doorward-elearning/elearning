import React, { useEffect, useState } from 'react';
import './PollView.scss';
import { Poll } from '@doorward/common/models/Poll';
import LabelRow from '@doorward/ui/components/LabelRow';
import moment from 'moment';
import hdate from 'human-date';
import Panel from '@doorward/ui/components/Panel';
import useAuth from '@doorward/ui/hooks/useAuth';
import { Roles } from '@doorward/ui/components/RolesManager';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useAction from '@doorward/ui/hooks/useActions';
import { votePollAction } from '../../reducers/conferences/actions';
import Spinner from '@doorward/ui/components/Spinner';
import Plural from '@doorward/ui/components/Plural';
import { PollOptions } from '@doorward/common/models/PollOptions';

const PollView: React.FunctionComponent<PollViewProps> = (props): JSX.Element => {
  const { user } = useAuth();
  const { poll } = props;
  const hasVoted = (userId: string) => {
    return poll.options.find(option => (option.votes || []).find(vote => vote.voterId === userId));
  };
  const [submittedOption, setSubmittedOption] = useState(undefined);
  const started = moment().isAfter(poll.startDate);
  const ended = moment().isAfter(poll.endDate);

  const [showResults, setShowResults] = useState(
    !user.roles.find(role => role.name === Roles.MEMBER) || hasVoted(user.id) || ended
  );

  const state = useSelector((state: State) => state.conferences.votePoll);
  const voteAction = useAction(votePollAction);

  const totalVotes = () => {
    return poll.options.reduce((acc, cur) => acc + (cur.votes || []).length, 0);
  };

  const getPercentage = (option: PollOptions) => {
    const total = totalVotes();
    return total === 0 ? 0 : ((option.votes || []).length * 100) / total;
  };

  useEffect(() => {
    if (state.submitted) {
      setShowResults(true);
    }
  }, [state]);

  return (
    <Panel>
      <div className="poll-view">
        <div>{poll.title}</div>
        {showResults ? (
          <div className="poll-options results">
            {poll.options.map(option => {
              const percentage = Math.ceil(getPercentage(option));
              return (
                <div className="poll-option">
                  <span style={{ width: percentage + '%' }} className="poll-percentage-indicator" />
                  <div className="poll-option__content">
                    <span className="poll-percentage">{percentage}% </span>
                    <span>{option.option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="poll-options vote">
            {poll.options.map(option => {
              return (
                <div
                  className="poll-option"
                  onClick={() => {
                    setSubmittedOption(option.id);
                    voteAction(poll.conferenceId, poll.id, option.id);
                  }}
                >
                  <div className="poll-option__content">
                    {submittedOption === option.id && state.submitting && <Spinner width={20} height={20} />}
                    <span>{option.option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <LabelRow className="meta">
          <span>
            <Plural singular="vote" count={totalVotes()} />
          </span>
          <span>
            {started
              ? ended
                ? 'Final Votes'
                : 'Voting ends in ' + hdate.relativeTime(poll.endDate)
              : 'Voting starts in ' + hdate.relativeTime(poll.startDate)}
          </span>
        </LabelRow>
      </div>
    </Panel>
  );
};

export interface PollViewProps {
  poll: Poll;
}

export default PollView;
