import React, { FunctionComponent, useEffect, useState } from 'react';
import './styles/ForumList.scss';
import { fetchForumsAction, startLiveClassroom } from '../../reducers/forums/actions';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import forumImage from '../../assets/images/forum.svg';
import EImage from '@doorward/ui/components/Image';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Tools from '@doorward/common/utils/Tools';
import Plural from '@doorward/ui/components/Plural';
import Row from '@doorward/ui/components/Row';
import ItemArray from '@doorward/ui/components/ItemArray';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Forum } from '@doorward/common/models/Forum';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';
import ProgressModal from '../../components/Modals/ProgressModal';
import useModal from '@doorward/ui/hooks/useModal';
import { useSelector } from 'react-redux';
import Icon from '@doorward/ui/components/Icon';
import classNames from 'classnames';

const ForumList: FunctionComponent<ForumListProps> = (props): JSX.Element => {
  const liveClassroomModal = useModal(false);
  const [classroomForum, startClassroom] = useState<Forum>(null);

  const launchClassroom = useSelector((state: State) => state.forums.launchClassroom);
  const routes = useRoutes();

  useEffect(() => {
    if (classroomForum) {
      liveClassroomModal.openModal();
    }
  }, [classroomForum]);
  return (
    <SimpleWebComponent
      action={fetchForumsAction}
      dataSelector={data => (data.forums || []).sort((a, b) => (a?.meetingRoom?.currentMeeting ? -1 : 1))}
      selector={(state: State) => state.forums.forumList}
    >
      {data => (
        <div>
          <div className="dashboard__forum-list">
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => startLiveClassroom(classroomForum?.id)}
              title={(classroomForum?.meetingRoom?.currentMeeting ? 'Joining ' : 'Starting ') + ' classroom.'}
              useModal={liveClassroomModal}
              onSuccess={data => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <ItemArray data={data}>
              {(forum: Forum) => (
                <div className="dashboard__forum-list__forum">
                  <Card>
                    <Card.Header image>
                      <div
                        className="card-image"
                        style={{ background: Tools.color(forum.id) }}
                        onClick={() => routes.navigate(routes.viewForum, { forumId: forum.id })}
                      >
                        <EImage src={forumImage} />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Header size={2}>{forum.title}</Header>
                      <div>
                        <ItemArray
                          data={Tools.truncate(forum.modules, 3)}
                          empty={<span>No modules have been added</span>}
                        >
                          {module => <div>{module.title}</div>}
                        </ItemArray>
                      </div>
                      <Row style={{ justifyContent: 'space-between' }}>
                        <span className="meta">{Tools.normalDate(forum.createdAt)}</span>
                        <RoleContainer roles={[Roles.MODERATOR]}>
                          <span className="meta text-primary">
                            <Plural singular="Member" count={+forum.numMembers} />
                          </span>
                        </RoleContainer>
                      </Row>
                      <div className="actions">
                        <Icon
                          className={classNames({
                            joinMeeting: forum?.meetingRoom?.currentMeeting,
                            action: true,
                          })}
                          icon="phone"
                          title="Live classroom"
                          onClick={() => startClassroom(forum)}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </ItemArray>
          </div>
        </div>
      )}
    </SimpleWebComponent>
  );
};

export interface ForumListProps {}

export default ForumList;
