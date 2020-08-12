import React from 'react';
import { Conference } from '@doorward/common/models/Conference';
import Header from '@doorward/ui/components/Header';
import WebComponent from '@doorward/ui/components/WebComponent';
import PollView from '../../PollView';
import './ConferencePollList.scss';

const ConferencePollList: React.FunctionComponent<ConferencePollListProps> = (props): JSX.Element => {
  const { conference } = props;
  return (
    <div className="conference-poll-list">
      <Header size={2} style={{ marginBottom: 'var(--padding)' }}>
        Polls
      </Header>
      <WebComponent data={conference.polls} loading={false} icon="poll" emptyMessage="No polls have been created yet.">
        {polls => {
          return (
            <div className="poll-list">
              {polls.map(poll => (
                <PollView poll={poll} />
              ))}
            </div>
          );
        }}
      </WebComponent>
    </div>
  );
};

export interface ConferencePollListProps {
  conference: Conference;
}

export default ConferencePollList;
