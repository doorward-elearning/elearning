import React, { MouseEventHandler } from 'react';
import Card from '../../ui/Card';
import EImage from '../../ui/Image';
import './Course.scss';
import Header from '../../ui/Header';
import { Course as Model } from '../../../services/models';

const Course: React.FunctionComponent<CourseProps> = ({ course, onClick }) => {
  return (
    <div className="course-card">
      <Card flat clickable onClick={onClick}>
        <Card.Header>
          <EImage />
        </Card.Header>
        <Card.Body>
          <Header size={3}>{course.title}</Header>
          <p>Modules: 5</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export interface CourseProps {
  course: Model;
  onClick: MouseEventHandler;
}

export default Course;
