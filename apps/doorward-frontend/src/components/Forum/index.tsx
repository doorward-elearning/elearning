import React, { MouseEventHandler } from 'react';
import './Forum.scss';
import EImage from '@doorward/ui/components/Image';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Forum as ForumModel } from '@doorward/common/models/Forum';

const Forum: React.FunctionComponent<ForumProps> = ({ forum, onClick }) => {
  return (
    <div className="forum-card">
      <Card flat clickable onClick={onClick}>
        <Card.Header>
          <EImage />
        </Card.Header>
        <Card.Body>
          <Header size={3}>{forum.title}</Header>
          <p>Modules: 5</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export interface ForumProps {
  forum: ForumModel;
  onClick: MouseEventHandler;
}

export default Forum;
