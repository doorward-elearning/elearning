import React, { MouseEventHandler } from 'react';
import './Course.scss';
import EImage from '@edudoor/ui/components/Image';
import Card from '@edudoor/ui/components/Card';
import Header from '@edudoor/ui/components/Header';
import { Course as CourseModel } from '@edudoor/common/models/Course';

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
  course: CourseModel;
  onClick: MouseEventHandler;
}

export default Course;
