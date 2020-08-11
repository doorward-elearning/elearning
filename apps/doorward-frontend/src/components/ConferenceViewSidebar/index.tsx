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
import { fetchConferenceManagersAction, fetchConferenceMemberListAction } from '../../reducers/conferences/actions';
import ListItem from '@doorward/ui/components/List/ListItem';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { Link, useRouteMatch } from 'react-router-dom';
import { State } from '../../store';
import Header from '@doorward/ui/components/Header';

const ConferenceViewSidebar: React.FunctionComponent<ConferenceViewSidebarProps> = props => {
  const members = useSelector((state: State) => state.conferences.memberList);
  const managers = useSelector((state: State) => state.conferences.managersList);
  const match: any = useRouteMatch<{ conferenceId: string }>();
  const routes = useRoutes();
  const fetchMembers = useAction(fetchConferenceMemberListAction);
  const fetchManagers = useAction(fetchConferenceManagersAction);
  const conferenceId = match.params.conferenceId;

  useEffect(() => {
    fetchMembers(conferenceId);
    fetchManagers(conferenceId);
  }, []);

  const MAX_MEMBERS = 3;
  const MAX_MANAGERS = 3;
  return (
    <div className="conference-view-sidebar">
      <RoleContainer roles={[Roles.MODERATOR]}>
        <Accordion
          open
          title={() => <Header size={5}>Member List</Header>}
          action={() => <Button mini bordered icon="add" onClick={props.addMemberModal.openModal} />}
        >
          <WebComponent
            data={members.data.members}
            loading={members.fetching}
            message="No members have been added to the conference yet."
            size="medium"
            actionMessage="Create a new member"
            onAction={(): void =>
              routes.navigate(routes.routes.addConferenceMember, {
                conferenceId,
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
                    to={routes.routes.conferenceMembers.withParams({
                      conferenceId: conferenceId,
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
            action={() => <Button mini bordered icon="add" onClick={props.addConferenceManagerModal.openModal} />}
            title={() => <Header size={5}>Conference Managers</Header>}
            open
          >
            <WebComponent
              data={managers.data.managers}
              loading={members.fetching}
              message="No managers have been added to the conference yet."
              size="medium"
              actionMessage="Create a new moderator"
              onAction={(): void =>
                routes.navigate(routes.routes.addModerator, {
                  conferenceId,
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

export interface ConferenceViewSidebarProps {
  addMemberModal: UseModal;
  addConferenceManagerModal: UseModal;
}

export default ConferenceViewSidebar;
