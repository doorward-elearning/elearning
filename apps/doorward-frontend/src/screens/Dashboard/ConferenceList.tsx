import React, { FunctionComponent, useEffect, useState } from 'react';
import './styles/ConferenceList.scss';
import { fetchConferencesAction, startLiveClassroom } from '../../reducers/conferences/actions';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import conferenceImage from '../../assets/images/conference.svg';
import EImage from '@doorward/ui/components/Image';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Tools from '@doorward/common/utils/Tools';
import Plural from '@doorward/ui/components/Plural';
import Row from '@doorward/ui/components/Row';
import ItemArray from '@doorward/ui/components/ItemArray';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Conference } from '@doorward/common/models/Conference';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';
import ProgressModal from '../../components/Modals/ProgressModal';
import useModal from '@doorward/ui/hooks/useModal';
import { useSelector } from 'react-redux';
import Icon from '@doorward/ui/components/Icon';
import classNames from 'classnames';

const ConferenceList: FunctionComponent<ConferenceListProps> = (props): JSX.Element => {
  const liveClassroomModal = useModal(false);
  const [classroomConference, startClassroom] = useState<Conference>(null);

  const launchClassroom = useSelector((state: State) => state.conferences.launchClassroom);
  const routes = useRoutes();

  useEffect(() => {
    if (classroomConference) {
      liveClassroomModal.openModal();
    }
  }, [classroomConference]);
  return (
    <SimpleWebComponent
      action={fetchConferencesAction}
      dataSelector={data => (data.conferences || []).sort((a, b) => (a?.meetingRoom?.currentMeeting ? -1 : 1))}
      selector={(state: State) => state.conferences.conferenceList}
    >
      {data => (
        <div>
          <div className="dashboard__conference-list">
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => startLiveClassroom(classroomConference?.id)}
              title={(classroomConference?.meetingRoom?.currentMeeting ? 'Joining ' : 'Starting ') + ' classroom.'}
              useModal={liveClassroomModal}
              onSuccess={data => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <ItemArray data={data}>
              {(conference: Conference) => (
                <div className="dashboard__conference-list__conference">
                  <Card>
                    <Card.Header image>
                      <div
                        className="card-image"
                        style={{ background: Tools.color(conference.id) }}
                        onClick={() => routes.navigate(routes.viewConference, { conferenceId: conference.id })}
                      >
                        <EImage src={conferenceImage} />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Header size={2}>{conference.title}</Header>
                      <div>
                        <ItemArray
                          data={Tools.truncate(conference.modules, 3)}
                          empty={<span>No modules have been added</span>}
                        >
                          {module => <div>{module.title}</div>}
                        </ItemArray>
                      </div>
                      <Row style={{ justifyContent: 'space-between' }}>
                        <span className="meta">{Tools.normalDate(conference.createdAt)}</span>
                        <RoleContainer roles={[Roles.MODERATOR]}>
                          <span className="meta text-primary">
                            <Plural singular="Member" count={+conference.numMembers} />
                          </span>
                        </RoleContainer>
                      </Row>
                      <div className="actions">
                        <Icon
                          className={classNames({
                            joinMeeting: conference?.meetingRoom?.currentMeeting,
                            action: true,
                          })}
                          icon="phone"
                          title="Live classroom"
                          onClick={() => startClassroom(conference)}
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

export interface ConferenceListProps {}

export default ConferenceList;
