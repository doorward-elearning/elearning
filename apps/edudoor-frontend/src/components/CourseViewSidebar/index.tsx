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
import { fetchCourseStudentListAction } from '../../reducers/courses/actions';
import ListItem from '@edudoor/ui/components/List/ListItem';
import { UseModal } from '@edudoor/ui/hooks/useModal';
import { Link, useRouteMatch } from 'react-router-dom';
import { State } from '../../store';
import Header from '@edudoor/ui/components/Header';

const CourseViewSidebar: React.FunctionComponent<
  CourseViewSidebarProps
> = props => {
  const students = useSelector((state: State) => state.courses.studentList);
  const match: any = useRouteMatch<{ courseId: string }>();
  const routes = useRoutes();
  const fetchStudents = useAction(fetchCourseStudentListAction);
  const courseId = match.params.courseId;

  useEffect(() => {
    fetchStudents(courseId);
  }, []);

  const MAX_STUDENTS = 3;
  return (
    <div className="course-view-sidebar">
      <RoleContainer roles={[Roles.TEACHER]}>
        <Accordion
          open
          title={() => <Header size={5}>Student List</Header>}
          action={() => (
            <Button
              mini
              bordered
              icon="add"
              onClick={props.addStudentModal.openModal}
            />
          )}
        >
          <WebComponent
            data={students.data.students}
            loading={students.fetching}
            message="No students have been added to the course yet."
            size="medium"
            actionMessage="Create a new student"
            onAction={(): void =>
              routes.navigate(routes.routes.addCourseStudent, {
                courseId
              })
            }
          >
            {(students): JSX.Element => (
              <List>
                <ItemArray data={students} max={MAX_STUDENTS}>
                  {student => (
                    <ListItem key={student.id}>{student.fullName}</ListItem>
                  )}
                </ItemArray>
                <ListItem>
                  <Link
                    to={routes.routes.courseStudents.withParams({
                      courseId: courseId
                    })}
                  >
                    View all
                  </Link>
                </ListItem>
              </List>
            )}
          </WebComponent>
        </Accordion>
        <Accordion title={() => <Header size={5}>Course Managers</Header>}>
          <Empty size="medium" />
        </Accordion>
      </RoleContainer>

      <Accordion
        open
        title={() => <Header size={5}>Announcement Calendar</Header>}
      >
        <Empty icon="event" size="medium" />
      </Accordion>
    </div>
  );
};

export interface CourseViewSidebarProps {
  addStudentModal: UseModal;
}

export default CourseViewSidebar;
