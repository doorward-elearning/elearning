import React from 'react';
import Card from '../../ui/Card';
import EImage from '../../ui/Image';
import './Course.scss';
import Header from '../../ui/Header';
import { CourseResponse } from '../../../services/responseBodies';

const Course: React.FunctionComponent<CourseProps> = ({ course }) => {
  return (
    <div className="course-card">
      <Card flat clickable>
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
  course: CourseResponse;
}

export default Course;
