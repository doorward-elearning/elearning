import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { match } from 'react-router';
import './Forums.scss';
import ForumModuleList from '../../components/Lists/ForumModuleList';
import ForumViewSidebar from '../../components/ForumViewSidebar';
import useViewForum from '../../hooks/useViewForum';
import ChooseMemberModal from '../../components/Modals/ChooseMemberModal';
import AddForumModuleModal from '../../components/Modals/AddForumModuleModal';
import EditableLabelForm from '../../components/Forms/EditableLabelForm';
import { startLiveClassroom, updateForumAction } from '../../reducers/forums/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import ForumViewMenu from '../../components/Dropdowns/ForumViewMenu';
import ProgressModal from '../../components/Modals/ProgressModal';
import useRoutes from '../../hooks/useRoutes';
import useEventListener from '../../hooks/useEventListener';
import { LIVE_CLASSROOM_STARTED } from '../../reducers/socket/types';
import WebComponent from '@doorward/ui/components/WebComponent';
import LabelRow from '@doorward/ui/components/LabelRow';
import Button from '@doorward/ui/components/Buttons/Button';
import { ModalFeatures } from '@doorward/ui/components/Modal';
import useModal from '@doorward/ui/hooks/useModal';
import IfElse from '@doorward/ui/components/IfElse';
import { Roles } from '@doorward/ui/components/RolesManager';
import { PageComponent } from '@doorward/ui/types';
import { Link } from 'react-router-dom';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import useRoleManager from '@doorward/ui/hooks/useRoleManager';
import { fetchModeratorListAction } from '../../reducers/moderators/actions';
import ChooseForumManagerModal from '../../components/Modals/ChooseForumManagerModal';
import useAction from '@doorward/ui/hooks/useActions';
import Pill from '@doorward/ui/components/Pill';
import Grid from '@doorward/ui/components/Grid';

const ViewForum: React.FunctionComponent<ViewForumProps> = props => {
  const addModuleModal = useModal(false);
  const addMemberModal = useModal(false);
  const addForumManagerModal = useModal(false);
  const liveClassroomModal = useModal(false);
  const isAdmin = useRoleManager();
  const fetchModerators = useAction(fetchModeratorListAction);

  useEffect(() => {
    if (isAdmin) {
      fetchModerators();
    }
  }, [isAdmin]);

  const liveClassroom: any = useEventListener(LIVE_CLASSROOM_STARTED);

  useEffect(() => {}, []);

  const [forumId, forum] = useViewForum();
  const routes = useRoutes();

  const updateForum = useSelector((state: State) => state.forums.updateForum);
  const launchClassroom = useSelector((state: State) => state.forums.launchClassroom);
  const moderatorList = useSelector((state: State) => state.moderators.moderatorList);
  return (
    <Layout
      {...props}
      className="view-forum"
      noNavBar
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={
        <IfElse condition={forum.data.forum}>
          <React.Fragment>
            <EditableLabelForm
              submitAction={updateForumAction}
              state={updateForum}
              name="title"
              roles={[Roles.MODERATOR]}
              createData={values => [forumId, values]}
              value={forum.data.forum?.title}
            />
          </React.Fragment>
        </IfElse>
      }
      renderHeaderEnd={(): JSX.Element => {
        return (
          <React.Fragment>
            <RoleContainer roles={[Roles.MODERATOR]}>
              <Button onClick={addModuleModal.openModal} bordered>
                Add Module
              </Button>
            </RoleContainer>
            <IfElse condition={liveClassroom?.forumId || forum.data.forum?.meetingRoom?.currentMeeting}>
              <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                Join live classroom
              </Button>
              <RoleContainer roles={[Roles.MODERATOR]}>
                <Button icon="phone" mini onClick={liveClassroomModal.openModal}>
                  Start live classroom
                </Button>
              </RoleContainer>
            </IfElse>
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => startLiveClassroom(forumId)}
              title="Starting classroom"
              useModal={liveClassroomModal}
              onSuccess={data => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <IfElse condition={forum.data.forum}>
              <ForumViewMenu forum={forum.data.forum} />
            </IfElse>
          </React.Fragment>
        );
      }}
    >
      <div className="view-forum__content">
        <WebComponent data={forum.data.forum} loading={forum.fetching}>
          {(forum): JSX.Element => {
            return (
              <div>
                <AddForumModuleModal
                  forumId={forum.id}
                  useModal={addModuleModal}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                />
                <ChooseMemberModal
                  forumId={forum.id}
                  className="choose__member__modal"
                  onSuccess={addMemberModal.closeModal}
                  useModal={addMemberModal}
                  features={[
                    ModalFeatures.POSITIVE_BUTTON,
                    ModalFeatures.CLOSE_BUTTON_FOOTER,
                    ModalFeatures.SEARCH_BAR,
                  ]}
                />
                <ChooseForumManagerModal
                  managers={moderatorList}
                  onSuccess={addForumManagerModal.closeModal}
                  forumId={forum.id}
                  features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
                  useModal={addForumManagerModal}
                />
                <div className="view-forum__module-list">
                  <Grid columns={2} justifyContent="space-between">
                    <LabelRow>
                      <span className="meta">{forum.modules.length} Modules</span>
                      <Link to={routes.assignmentList.link} className="meta">
                        {forum.itemCount.assignments} Assignments
                      </Link>
                      <span className="meta">{forum.itemCount.quizzes} Quizzes</span>
                      <span className="meta">{forum.itemCount.pages} Pages</span>
                    </LabelRow>
                    <div style={{ justifySelf: 'end' }}>
                      <Pill>
                        Authored by - <b>{forum.author.fullName}</b>
                      </Pill>
                    </div>
                  </Grid>
                  <ForumModuleList forum={forum} />
                </div>
              </div>
            );
          }}
        </WebComponent>
        <ForumViewSidebar addMemberModal={addMemberModal} addForumManagerModal={addForumManagerModal} />
      </div>
    </Layout>
  );
};

export interface ViewForumProps extends PageComponent {
  match: match<{ forumId: string }>;
}

export default ViewForum;
