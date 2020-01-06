import React, { MouseEventHandler } from 'react';
import './Course.scss';
import EImage from '@edudoor/ui/components/Image';
import { Course } from '@edudoor/common/models';
import Card from '@edudoor/ui/components/Card';
import Header from '@edudoor/ui/components/Header';

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
