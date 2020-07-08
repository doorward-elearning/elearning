import React, { MouseEventHandler } from 'react';
import './Course.scss';
import EImage from '@doorward/ui/components/Image';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Course as CourseModel } from '@doorward/common/models/Course';

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