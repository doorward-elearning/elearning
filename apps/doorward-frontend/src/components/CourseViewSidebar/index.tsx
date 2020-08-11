import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';
import React from 'react';
import { useSelector } from 'react-redux';
import useAction from '@doorward/ui/hooks/useActions';
import ItemArray from '@doorward/ui/components/ItemArray';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import Empty from '@doorward/ui/components/Empty';
import Accordion from '@doorward/ui/components/Accordion';
import Button from '@doorward/ui/components/Buttons/Button';
import { useEffect } from 'react';
import List from '@doorward/ui/components/List';
import { fetchCourseManagersAction, fetchCourseMemberListAction } from '../../reducers/courses/actions';
import ListItem from '@doorward/ui/components/List/ListItem';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { Link, useRouteMatch } from 'react-router-dom';
import { State } from '../../store';
import Header from '@doorward/ui/components/Header';

const CourseViewSidebar: React.FunctionComponent<CourseViewSidebarProps> = props => {
  const members = useSelector((state: State) => state.courses.memberList);
  const managers = useSelector((state: State) => state.courses.managersList);
  const match: any = useRouteMatch<{ courseId: string }>();
  const routes = useRoutes();
  const fetchMembers = useAction(fetchCourseMemberListAction);
  const fetchManagers = useAction(fetchCourseManagersAction);
  const courseId = match.params.courseId;

  useEffect(() => {
    fetchMembers(courseId);
    fetchManagers(courseId);
  }, []);

  const MAX_MEMBERS = 3;
  const MAX_MANAGERS = 3;
  return (
    <div className="course-view-sidebar">
      <RoleContainer roles={[Roles.TEACHER]}>
        <Accordion
          open
          title={() => <Header size={5}>Member List</Header>}
          action={() => <Button mini bordered icon="add" onClick={props.addMemberModal.openModal} />}
        >
          <WebComponent
            data={members.data.members}
            loading={members.fetching}
            message="No members have been added to the course yet."
            size="medium"
            actionMessage="Create a new member"
            onAction={(): void =>
              routes.navigate(routes.routes.addCourseMember, {
                courseId,
              })
            }
          >
            {(members): JSX.Element => (
              <List>
                <ItemArray data={members} max={MAX_MEMBERS}>
                  {member => <ListItem key={member.id}>{member.fullName}</ListItem>}
                </ItemArray>
                <ListItem>
                  <Link
                    to={routes.routes.courseMembers.withParams({
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
              loading={members.fetching}
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
  addMemberModal: UseModal;
  addCourseManagerModal: UseModal;
}

export default CourseViewSidebar;
