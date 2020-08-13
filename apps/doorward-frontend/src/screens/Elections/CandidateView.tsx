import React from 'react';
import './CandidateView.scss';
import { ElectionNominees } from '@doorward/common/models/ElectionNominees';
import Card from '@doorward/ui/components/Card';
import EImage from '@doorward/ui/components/Image';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import useAuth from '@doorward/ui/hooks/useAuth';
import Button from '@doorward/ui/components/Buttons/Button';
import { Election } from '@doorward/common/models/Election';

const CandidateView: React.FunctionComponent<CandidateViewProps> = (props): JSX.Element => {
  const { isMember, user } = useAuth();
  const { nominee } = props;
  return (
    <div className="candidate-view">
      <Card>
        <Card.Body>
          <div className="candidate-view__profile">
            <EImage src={nominee.profilePicture} circle size="large" />
            <h1>{nominee.name}</h1>
            <Button>Vote</Button>
            <div>
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
