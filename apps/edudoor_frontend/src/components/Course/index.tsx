import React, { MouseEventHandler } from 'react';
import Card from '../../../../../libs/ui/components/Card';
import EImage from '../../../../../libs/ui/components/Image';
import './Course.scss';
import Header from '../../../../../../libs/ui/components/Header';
import { Course } from '../../../services/models';

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
