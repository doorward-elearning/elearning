import React from 'react';
import { Election } from '@doorward/common/models/Election';
import './CandidateResultView.scss';
import EImage from '@doorward/ui/components/Image';
import Panel from '@doorward/ui/components/Panel';
import Pill from '@doorward/ui/components/Pill';
import Plural from '@doorward/ui/components/Plural';

const CandidateResultView: React.FunctionComponent<CandidateResultViewProps> = (props): JSX.Element => {
  const {
    election: { nominees },
  } = props;
  const totalVotes = nominees.reduce((acc, cur) => acc + (cur.votes?.length || 0), 0);
  return (
    <div className="candidates-result-view">
      {nominees
        .sort((a, b) => a.votes.length - b.votes.length)
        .map(nominee => {
          const percentage = totalVotes === 0 ? 0 : ((nominee.votes?.length || 0) * 100) / totalVotes;
          return (
            <div className="candidate-result">
              <Panel>
                <div className="candidate-profile">
                  <EImage src={nominee.profilePicture} circle size="small" />
                  <div>
                    <div>{nominee.name}</div>
                    <Pill className="title">
                      <Plural singular="Vote" count={nominee.votes?.length || 0} />
                    </Pill>
                  </div>
                </div>
              </Panel>
              <div className="votes-bar">
                <div className="votes-bar__container" style={{ width: percentage + '%' }} />
              </div>
              <h2>{percentage}%</h2>
            </div>
          );
        })}
    </div>
  );
};

export interface CandidateResultViewProps {
  election: Election;
}

export default CandidateResultView;
