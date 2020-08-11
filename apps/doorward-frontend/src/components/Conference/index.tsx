import React, { MouseEventHandler } from 'react';
import './Conference.scss';
import EImage from '@doorward/ui/components/Image';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Conference as ConferenceModel } from '@doorward/common/models/Conference';

const Conference: React.FunctionComponent<ConferenceProps> = ({ conference, onClick }) => {
  return (
    <div className="conference-card">
      <Card flat clickable onClick={onClick}>
        <Card.Header>
          <EImage />
        </Card.Header>
        <Card.Body>
          <Header size={3}>{conference.title}</Header>
          <p>Modules: 5</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export interface ConferenceProps {
  conference: ConferenceModel;
  onClick: MouseEventHandler;
}

export default Conference;
