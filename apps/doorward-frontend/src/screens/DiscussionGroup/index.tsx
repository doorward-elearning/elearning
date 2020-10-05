import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './DiscussionGroup.scss';
import { PageComponent } from '@doorward/ui/types';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardApi from '../../services/apis/doorward.api';
import { useRouteMatch } from 'react-router';
import Tools from '@doorward/common/utils/Tools';
import useRoutes from '../../hooks/useRoutes';
import useViewCourse from '../../hooks/useViewCourse';
import Panel from '@doorward/ui/components/Panel';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import WebComponent from '@doorward/ui/components/WebComponent';
import Header from '@doorward/ui/components/Header';
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';

const DiscussionGroup: React.FunctionComponent<DiscussionGroupProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.discussionGroups.getDiscussionGroup);
  const fetchDiscussionGroup = useAction(DoorwardApi.discussionGroups.getDiscussionGroup);
  const match = useRouteMatch<{ discussionGroupId: string; courseId: string }>();
  const [discussionGroup, setDiscussionGroup] = useState();
  useViewCourse();
  const routes = useRoutes();

  useEffect(() => {
    if (state.data.discussionGroup) {
      setDiscussionGroup(state.data.discussionGroup);
      routes.setCurrentTitle(state.data.discussionGroup.title);
    }
  }, [state]);

  useEffect(() => {
    fetchDiscussionGroup(match.params.discussionGroupId);
  }, []);

  return (
    <Layout
      {...props}
      className="discussion-group-page"
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON, LayoutFeatures.HEADER]}
      header={Tools.str(discussionGroup?.title)}
    >
      <WebComponent
        data={state.data.discussionGroup}
        loading={state.fetching}
        icon="forum"
        emptyMessage="Discussion group does not exist."
      >
        {(discussionGroup) => {
          return (
            <div className="discussion-group-page__content">
              <div className="discussion-content">
                <Panel>
                  <DraftHTMLContent content={discussionGroup.description} />
                </Panel>
              </div>
              <div className="discussion-info">
                <Header size={3} padded>
                  Moderators
                </Header>
                <SimpleUserView user={discussionGroup.creator} />
                <Header size={3} padded>
                  Participants
                </Header>
                <WebComponent data={null} loading={false} size="medium">
                  {() => <div />}
                </WebComponent>
              </div>
            </div>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface DiscussionGroupProps extends PageComponent {}

export default DiscussionGroup;
