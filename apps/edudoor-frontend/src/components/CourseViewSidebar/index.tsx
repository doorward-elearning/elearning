import RoleContainer from '@edudoor/ui/components/RolesManager/RoleContainer';
import { Roles } from '@edudoor/ui/components/RolesManager';
import React from 'react';
import { useSelector } from 'react-redux';
import useAction from '@edudoor/ui/hooks/useActions';
import ItemArray from '@edudoor/ui/components/ItemArray';
import WebComponent from '@edudoor/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import Empty from '@edudoor/ui/components/Empty';
import Accordion from '@edudoor/ui/components/Accordion';
import Button from '@edudoor/ui/components/Buttons/Button';
import { useEffect } from 'react';
import List from '@edudoor/ui/components/List';
import { fetchCourseManagersAction, fetchCourseStudentListAction } from '../../reducers/courses/actions';
import ListItem from '@edudoor/ui/components/List/ListItem';
import { UseModal } from '@edudoor/ui/hooks/useModal';
import { Link, useRouteMatch } from 'react-router-dom';
import { State } from '../../store';
import Header from '@edudoor/ui/components/Header';

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = props => {
  const students = useSelector((state: State) => state.courses.studentList);
  const managers = useSelector((state: State) => state.courses.managersList);
  const match: any = useRouteMatch<{ courseId: string }>();
  const routes = useRoutes();
  const fetchStudents = useAction(fetchCourseStudentListAction);
  const fetchManagers = useAction(fetchCourseManagersAction);
  const courseId = match.params.courseId;

  useEffect(() => {
    fetchStudents(courseId);
    fetchManagers(courseId);
  }, []);

  const MAX_STUDENTS = 3;
  const MAX_MANAGERS = 3;
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
                  {student => <ListItem key={student.id}>{student.fullName}</ListItem>}
                </ItemArray>
                <ListItem>
                  <Link
                    to={routes.routes.courseStudents.withParams({
                      courseId: courseId,
                    })}
                  >
                    View all
                  </Link>
                </ListItem>
              </List>
            )}
          </WebComponent>
        </Accordion>
        <div style={{ marginTop: 'var(--padding)' }}>
          <Accordion
            action={() => <Button mini bordered icon="add" onClick={props.addCourseManagerModal.openModal} />}
            title={() => <Header size={5}>Course Managers</Header>}
            open
          >
            <WebComponent
              data={managers.data.managers}
              loading={students.fetching}
              message="No managers have been added to the course yet."
              size="medium"
              actionMessage="Create a new teacher"
              onAction={(): void =>
                routes.navigate(routes.routes.addTeacher, {
                  courseId,
                })
              }
            >
              {(managers): JSX.Element => (
                <List>
                  <ItemArray data={managers} max={MAX_MANAGERS}>
                    {manager => <ListItem key={manager.id}>{manager.fullName}</ListItem>}
                  </ItemArray>
                </List>
              )}
            </WebComponent>
          </Accordion>
        </div>
      </RoleContainer>

      <div style={{ marginTop: 'var(--padding)' }}>
        <Accordion open title={() => <Header size={5}>Announcement Calendar</Header>}>
          <Empty icon="event" size="medium" />
        </Accordion>
      </div>
    </div>
  );
};

export interface CourseViewSidebarProps {
  addStudentModal: UseModal;
  addCourseManagerModal: UseModal;
}

export default CourseViewSidebar;
