import React, { useEffect } from 'react';
import List from '../../ui/List';
import ListItem from '../../ui/List/ListItem';
import Header from '../../ui/Header';
import Button from '../../ui/Buttons/Button';
import Row from '../../ui/Row';
import './CourseViewSidebar.scss';
import Accordion from '../../ui/Accordion';
import Empty from '../../ui/Empty';
import { UseModal } from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import WebComponent from '../../ui/WebComponent';
import useAction from '../../../hooks/useActions';
import { fetchCourseStudentListAction } from '../../../reducers/courses/actions';
import { useLocation, useRouteMatch } from 'react-router';

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = props => {
  const students = useSelector((state: State) => state.courses.studentList);
  const match = useRouteMatch<{ courseId: string }>();
  const fetchStudents = useAction(fetchCourseStudentListAction);
  useEffect(() => {
    if (match) {
      fetchStudents(+match.params.courseId);
    }
  }, [match]);
  const MAX_STUDENTS = 3;
  return (
    <div className="course-view-sidebar">
      <Accordion
        open
        title={() => <Header size={5}>Student List</Header>}
        action={() => <Button mini bordered icon="add" onClick={props.addStudentModal.openModal} />}
      >
        <WebComponent
          data={students.data.students}
          loading={students.fetching}
          message="No students have been added to the course yet."
          size="medium"
          actionMessage="Add Student"
          onAction={props.addStudentModal.openModal}
        >
          {(students): JSX.Element => (
            <List>
              <ListItem>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Header size={3}>Student List</Header>
                </Row>
              </ListItem>
              {students
                .filter((s, index) => index < MAX_STUDENTS)
                .map(student => (
                  <ListItem key={student.id}>{student.firstName + ' ' + student.lastName}</ListItem>
                ))}
              <ListItem>
                <a href="#">View all</a>
              </ListItem>
            </List>
          )}
        </WebComponent>
      </Accordion>
      <Button icon="add">New Manager</Button>
      <Button icon="video_call" bordered>
        Live classroom
      </Button>
      <Accordion title={() => <Header size={5}>Course Settings</Header>}>
        <Empty size="medium" />
      </Accordion>
      <Accordion open title={() => <Header size={5}>Announcement Calendar</Header>}>
        <Empty icon="event" size="medium" />
      </Accordion>
    </div>
  );
};

export interface CourseViewSidebarProps {
  addStudentModal: UseModal;
}

export default CourseViewSidebar;
