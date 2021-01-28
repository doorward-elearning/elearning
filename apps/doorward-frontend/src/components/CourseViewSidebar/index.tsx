import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import React, { useEffect } from 'react';
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
import usePrivileges from '@doorward/ui/hooks/usePrivileges';
import './CourseViewSidebar.scss';
import translate from '@doorward/common/lang/translate';
import useAuth from '../../hooks/useAuth';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import { useApiAction } from 'use-api-action';

const MAX_STUDENTS = 3;
const MAX_MANAGERS = 3;
const MAX_DISCUSSION_GROUPS = 5;

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = (props) => {
  const [getStudentsInCourse, studentsInCourse] = useApiAction(DoorwardApi, (api) => api.students.getStudentsInCourse);
  const [getCourseManagers, courseManagers] = useApiAction(DoorwardApi, (api) => api.courseManagers.getCourseManagers);
  const [getDiscussionGroups, discussionGroups] = useApiAction(DoorwardApi, (api) => api.discussionGroups.getAll);
  const [getCourse, courseState] = useApiAction(DoorwardApi, (api) => api.courses.getCourse);
  const [createCourseManager, createCourseManagerState] = useApiAction(
    DoorwardApi,
    (api) => api.courseManagers.createCourseManager
  );
  const match: any = useRouteMatch<{ courseId: string }>();
  const hasPrivileges = usePrivileges();
  const auth = useAuth();

  const routes = useRoutes();
  const courseId = match.params.courseId;

  useEffect(() => {
    if (hasPrivileges('students.list')) {
      getStudentsInCourse(courseId);
    }
    if (hasPrivileges('course-managers.view')) {
      getCourseManagers(courseId);
    }
    if (hasPrivileges('discussion-groups.list')) {
      getDiscussionGroups(courseId);
    }
  }, []);

  useFormSubmit(createCourseManagerState, () => {
    if (hasPrivileges('course-managers.view')) {
      getCourseManagers(courseId);
    }
  });

  return (
    <div className="course-view-sidebar">
      <RoleContainer privileges={['students.*']}>
        <Accordion
          open
          title={() => <Header size={5}>{translate('studentList')}</Header>}
          action={() => <Button mini bordered icon="add" onClick={props.addStudentModal.openModal} />}
        >
          <WebComponent
            data={studentsInCourse.data.students}
            loading={studentsInCourse.fetching}
            message={translate('noStudentHaveBeenAddedToTheCourseYet')}
            size="medium"
            actionMessage={translate('createStudent')}
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
                    {translate('viewAll')}
                  </Link>
                </ListItem>
              </List>
            )}
          </WebComponent>
        </Accordion>
        <div style={{ marginTop: 'var(--padding)' }}>
          <Accordion
            action={() => <Button mini bordered icon="add" onClick={props.addCourseManagerModal.openModal} />}
            title={() => <Header size={5}>{translate('courseManagers')}</Header>}
            open
          >
            <WebComponent
              data={courseManagers.data.courseManagers}
              loading={studentsInCourse.fetching}
              message={translate('noManagersHaveBeenAdded')}
              size="medium"
              actionMessage={translate('createTeacher')}
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
            title={() => <Header size={5}>{translate('discussionGroups')}</Header>}
          >
            <WebComponent
              data={discussionGroups.data.discussionGroups}
              loading={discussionGroups.fetching}
              emptyMessage={translate('noDiscussionGroupsHaveBeenAdded')}
              size="medium"
              icon="forum"
              actionMessage={hasPrivileges('discussion-groups.create') ? translate('createDiscussionGroup') : ''}
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
