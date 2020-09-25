import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';
import React, { useEffect } from 'react';
import useAction from '@doorward/ui/hooks/useActions';
import ItemArray from '@doorward/ui/components/ItemArray';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import Empty from '@doorward/ui/components/Empty';
import Accordion from '@doorward/ui/components/Accordion';
import Button from '@doorward/ui/components/Buttons/Button';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { Link, useRouteMatch } from 'react-router-dom';
import Header from '@doorward/ui/components/Header';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = (props) => {
  const students = useDoorwardApi((state) => state.students.getStudentsInCourse);
  const managers = useDoorwardApi((state) => state.courseManagers.getCourseManagers);
  const match: any = useRouteMatch<{ courseId: string }>();
  const routes = useRoutes();
  const fetchStudents = useAction(DoorwardApi.students.getStudentsInCourse);
  const fetchManagers = useAction(DoorwardApi.courseManagers.getCourseManagers);
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
                  {(student) => <ListItem key={student.id}>{student.fullName}</ListItem>}
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
              data={managers.data.courseManagers}
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
                    {(manager) => <ListItem key={manager.id}>{manager?.manager?.fullName}</ListItem>}
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
