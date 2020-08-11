import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { match } from 'react-router';
import './Conferences.scss';
import ConferenceModuleList from '../../components/Lists/ConferenceModuleList';
import ConferenceViewSidebar from '../../components/ConferenceViewSidebar';
import useViewConference from '../../hooks/useViewConference';
import ChooseMemberModal from '../../components/Modals/ChooseMemberModal';
import AddConferencePollModal from '../../components/Modals/AddConferenceModuleModal';
import EditableLabelForm from '../../components/Forms/EditableLabelForm';
import { startLiveClassroom, updateConferenceAction } from '../../reducers/conferences/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import ConferenceViewMenu from '../../components/Dropdowns/ConferenceViewMenu';
import ProgressModal from '../../components/Modals/ProgressModal';
import useRoutes from '../../hooks/useRoutes';
import useEventListener from '../../hooks/useEventListener';
import { LIVE_CLASSROOM_STARTED } from '../../reducers/socket/types';
import WebComponent from '@doorward/ui/components/WebComponent';
import Button from '@doorward/ui/components/Buttons/Button';
import { ModalFeatures } from '@doorward/ui/components/Modal';
import useModal from '@doorward/ui/hooks/useModal';
import IfElse from '@doorward/ui/components/IfElse';
import { Roles } from '@doorward/ui/components/RolesManager';
import { PageComponent } from '@doorward/ui/types';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import useRoleManager from '@doorward/ui/hooks/useRoleManager';
import { fetchModeratorListAction } from '../../reducers/moderators/actions';
import ChooseConferenceManagerModal from '../../components/Modals/ChooseConferenceManagerModal';
import useAction from '@doorward/ui/hooks/useActions';
import Pill from '@doorward/ui/components/Pill';
import Grid from '@doorward/ui/components/Grid';

const ViewConference: React.FunctionComponent<ViewConferenceProps> = props => {
  const routes = useRoutes();
  const addConferencePoll = useModal(props.location.pathname === routes.createPoll.link);
  const addMemberModal = useModal(false);
  const addConferenceManagerModal = useModal(false);
  const meetingModal = useModal(false);
  const isAdmin = useRoleManager();
  const fetchModerators = useAction(fetchModeratorListAction);

  addConferencePoll.onClose(() => {
    routes.navigate(routes.viewConference, { conferenceId: conference?.data?.conference?.id });
  });

  useEffect(() => {
    if (isAdmin) {
      fetchModerators();
    }
  }, [isAdmin]);

  const liveClassroom: any = useEventListener(LIVE_CLASSROOM_STARTED);

  useEffect(() => {}, []);

  const [conferenceId, conference] = useViewConference();

  const updateConference = useSelector((state: State) => state.conferences.updateConference);
  const launchClassroom = useSelector((state: State) => state.conferences.launchClassroom);
  const moderatorList = useSelector((state: State) => state.moderators.moderatorList);
  return (
    <Layout
      {...props}
      className="view-conference"
      noNavBar
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={
        <IfElse condition={conference.data.conference}>
          <React.Fragment>
            <EditableLabelForm
              submitAction={updateConferenceAction}
              state={updateConference}
              name="title"
              roles={[Roles.MODERATOR]}
              createData={values => [conferenceId, values]}
              value={conference.data.conference?.title}
            />
          </React.Fragment>
        </IfElse>
      }
      renderHeaderEnd={(): JSX.Element => {
        return (
          <React.Fragment>
            <RoleContainer roles={[Roles.MODERATOR]}>
              <Button
                onClick={() => {
                  addConferencePoll.openModal();
                }}
                bordered
              >
                Create Poll
              </Button>
            </RoleContainer>
            <IfElse condition={liveClassroom?.conferenceId || conference.data.conference?.meetingRoom?.currentMeeting}>
              <Button icon="phone" mini onClick={meetingModal.openModal}>
                Join meeting
              </Button>
              <RoleContainer roles={[Roles.MODERATOR]}>
                <Button icon="phone" mini onClick={meetingModal.openModal}>
                  Start meeting
                </Button>
              </RoleContainer>
            </IfElse>
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => startLiveClassroom(conferenceId)}
              title="Starting classroom"
              useModal={meetingModal}
              onSuccess={data => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <IfElse condition={conference.data.conference}>
              <ConferenceViewMenu conference={conference.data.conference} />
            </IfElse>
          </React.Fragment>
        );
      }}
    >
      <div className="view-conference__content">
        <WebComponent data={conference.data.conference} loading={conference.fetching}>
          {(conference): JSX.Element => {
            return (
              <div>
                <AddConferencePollModal
                  conferenceId={conference.id}
                  useModal={addConferencePoll}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                />
                <ChooseMemberModal
                  conferenceId={conference.id}
                  className="choose__member__modal"
                  onSuccess={addMemberModal.closeModal}
                  useModal={addMemberModal}
                  features={[
                    ModalFeatures.POSITIVE_BUTTON,
                    ModalFeatures.CLOSE_BUTTON_FOOTER,
                    ModalFeatures.SEARCH_BAR,
                  ]}
                />
                <ChooseConferenceManagerModal
                  managers={moderatorList}
                  onSuccess={addConferenceManagerModal.closeModal}
                  conferenceId={conference.id}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                  useModal={addConferenceManagerModal}
                />
                <div className="view-conference__module-list">
                  <Grid columns={2} justifyContent="space-between">
                    <div style={{ justifySelf: 'start' }}>
                      <Pill>
                        Authored by - <b>{conference.author.fullName}</b>
                      </Pill>
                    </div>
                  </Grid>
                  <ConferenceModuleList conference={conference} />
                </div>
              </div>
            );
          }}
        </WebComponent>
        <ConferenceViewSidebar addMemberModal={addMemberModal} addConferenceManagerModal={addConferenceManagerModal} />
      </div>
    </Layout>
  );
};

export interface ViewConferenceProps extends PageComponent {
  match: match<{ conferenceId: string }>;
}

export default ViewConference;
