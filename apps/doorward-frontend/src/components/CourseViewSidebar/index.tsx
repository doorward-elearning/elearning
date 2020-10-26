import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import React, { useEffect } from 'react';
import useAction from '@doorward/ui/hooks/useActions';
import ItemArray from '@doorward/ui/components/ItemArray';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import Accordion from '@doorward/ui/components/Accordion';
import Button from '@doorward/ui/components/Buttons/Button';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { Link, useRouteMatch } from 'react-router-dom';
import Header from '@doorward/ui/components/Header';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import translate from '@doorward/common/lang/translate';

const MAX_STUDENTS = 3;
const MAX_MANAGERS = 3;
const MAX_DISCUSSION_GROUPS = 5;

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = (props) => {
  const students = useDoorwardApi((state) => state.students.getStudentsInCourse);
  const managers = useDoorwardApi((state) => state.courseManagers.getCourseManagers);
  const discussionGroups = useDoorwardApi((state) => state.discussionGroups.getAll);
  const match: any = useRouteMatch<{ courseId: string }>();
  const hasPrivileges = usePrivileges();

  const routes = useRoutes();
  const fetchStudents = useAction(DoorwardApi.students.getStudentsInCourse);
  const fetchManagers = useAction(DoorwardApi.courseManagers.getCourseManagers);
  const fetchDiscussionGroups = useAction(DoorwardApi.discussionGroups.getAll);
  const courseId = match.params.courseId;

  useEffect(() => {
    if (hasPrivileges('students.list')) {
      fetchStudents(courseId);
    }
    if (hasPrivileges('course-managers.view')) {
      fetchManagers(courseId);
    }
    if (hasPrivileges('discussion-groups.list')) {
      fetchDiscussionGroups(courseId);
    }
  }, []);

  return (
    <div className="course-view-sidebar">
      <RoleContainer privileges={['students.*']}>
        <Accordion
          open
          title={() => <Header size={5}>{translate.studentList()}</Header>}
          action={() => <Button mini bordered icon="add" onClick={props.addStudentModal.openModal} />}
        >
          <WebComponent
            data={students.data.students}
            loading={students.fetching}
            message={translate.noStudentHaveBeenAddedToTheCourseYet()}
            size="medium"
            actionMessage={translate.createStudent()}
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
                    {translate.viewAll()}
                  </Link>
                </ListItem>
              </List>
            )}
          </WebComponent>
        </Accordion>
        <div style={{ marginTop: 'var(--padding)' }}>
          <Accordion
            action={() => <Button mini bordered icon="add" onClick={props.addCourseManagerModal.openModal} />}
            title={() => <Header size={5}>{translate.courseManagers()}</Header>}
            open
          >
            <WebComponent
              data={managers.data.courseManagers}
              loading={students.fetching}
              message={translate.noManagersHaveBeenAdded()}
              size="medium"
              actionMessage={translate.createTeacher()}
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

      <RoleContainer privileges={['discussion-groups.list']}>
        <div style={{ marginTop: 'var(--padding)' }}>
          <Accordion
            open
            action={() => (
              <RoleContainer privileges={['discussion-groups.create']}>
                <Button mini bordered icon="add" onClick={props.addDiscussionGroupModal.openModal} />
              </RoleContainer>
            )}
            title={() => <Header size={5}>{translate.discussionGroups()}</Header>}
          >
            <WebComponent
              data={discussionGroups.data.discussionGroups}
              loading={discussionGroups.fetching}
              emptyMessage={translate.noDiscussionGroupsHaveBeenAdded()}
              size="medium"
              icon="forum"
              actionMessage={hasPrivileges('discussion-groups.create') ? translate.createDiscussionGroup() : ''}
              onAction={hasPrivileges('discussion-groups.create') ? props.addDiscussionGroupModal.openModal : null}
            >
              {(discussions) => (
                <List>
                  <ItemArray data={discussions} max={MAX_DISCUSSION_GROUPS}>
                    {(discussion) => (
                      <ListItem key={discussion.id}>
                        <Link
                          to={routes.viewDiscussionGroup.withParams({
                            courseId: courseId,
                            discussionGroupId: discussion.id,
                          })}
                        >
                          {discussion.title}
                        </Link>
                      </ListItem>
                    )}
                  </ItemArray>
                </List>
              )}
            </WebComponent>
          </Accordion>
        </div>
      </RoleContainer>
    </div>
  );
};

export interface CourseViewSidebarProps {
  addStudentModal: UseModal;
  addCourseManagerModal: UseModal;
  addDiscussionGroupModal: UseModal;
}

export default CourseViewSidebar;
