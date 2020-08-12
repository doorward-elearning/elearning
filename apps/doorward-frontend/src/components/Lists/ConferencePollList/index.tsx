import React from 'react';
import { Conference } from '@doorward/common/models/Conference';
import Header from '@doorward/ui/components/Header';

const ConferencePollList: React.FunctionComponent<ConferencePollListProps> = (props): JSX.Element => {
  const { conference } = props;
  return (
    <div className="conference-poll-list">
      <Header size={2}>Polls</Header>
    </div>
  );
};

export interface ConferencePollListProps {
  conference: Conference;
}

export default ConferencePollList;
