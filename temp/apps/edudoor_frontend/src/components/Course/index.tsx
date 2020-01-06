import React, { MouseEventHandler } from 'react';
import Card from '@edudoor/ui/src/components/Card';
import EImage from '@edudoor/ui/src/components/Image';
import './Course.scss';
import { Course } from '../../../../../libs/shared/models';
import Header from '@edudoor/ui/src/components/Header';

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
  course: Course;
  onClick: MouseEventHandler;
}

export default Course;
