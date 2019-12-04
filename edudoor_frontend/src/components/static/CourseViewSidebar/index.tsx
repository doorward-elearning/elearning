import React, { useEffect } from 'react';
import List from '../../ui/List';
import ListItem from '../../ui/List/ListItem';
import Header from '../../ui/Header';
import Button from '../../ui/Buttons/Button';
import './CourseViewSidebar.scss';
import Accordion from '../../ui/Accordion';
import Empty from '../../ui/Empty';
import { UseModal } from '../../../hooks/useModal';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import WebComponent from '../../ui/WebComponent';
import useAction from '../../../hooks/useActions';
import { fetchCourseStudentListAction } from '../../../reducers/courses/actions';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import useRoutes from '../../../hooks/useRoutes';
import RoleContainer from '../RolesManager/RoleContainer';
import { Roles } from '../RolesManager';
import ItemArray from '../../ui/ItemArray';

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = props => {
  const students = useSelector((state: State) => state.courses.studentList);
  const match: any = useRouteMatch<{ courseId: string }>();
  const routes = useRoutes();
  const fetchStudents = useAction(fetchCourseStudentListAction);
  const courseId = match.params.courseId;

  useEffect(() => {
    fetchStudents(courseId);
  }, [match]);

  const MAX_STUDENTS = 3;
  return (
    <div className="course-view-sidebar">
      <RoleContainer roles={[Roles.TEACHER]}>
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
            actionMessage="Create a new student"
            onAction={(): void =>
              routes.navigate(routes.routes.addCourseStudent, {
                courseId,
              })
            }
          >
            {(students): JSX.Element => (
              <List>
                <ItemArray data={students} max={MAX_STUDENTS}>
                  {student => <ListItem key={student.id}>{student.firstName + ' ' + student.lastName}</ListItem>}
                </ItemArray>
                <ListItem>
                  <Link to={routes.routes.courseStudents.withParams({ courseId: courseId })}>View all</Link>
                </ListItem>
              </List>
            )}
          </WebComponent>
        </Accordion>
        <Accordion title={() => <Header size={5}>Course Managers</Header>}>
          <Empty size="medium" />
        </Accordion>
      </RoleContainer>

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
