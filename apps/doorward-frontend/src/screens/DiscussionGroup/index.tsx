import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './DiscussionGroup.scss';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import { useHistory, useRouteMatch } from 'react-router';
import Tools from '@doorward/common/utils/Tools';
import Panel from '@doorward/ui/components/Panel';
import HTMLContentView from '@doorward/ui/components/HTMLContentView';
import WebComponent from '@doorward/ui/components/WebComponent';
import Header from '@doorward/ui/components/Header';
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';
import DiscussionCommentForm from '../../components/Forms/DiscussionCommentForm';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const DiscussionGroup: React.FunctionComponent<DiscussionGroupProps> = (props): JSX.Element => {
  const [fetchDiscussionGroup, state] = useApiAction(DoorwardApi, (api) => api.discussionGroups.getDiscussionGroup);
  const match = useRouteMatch<{ discussionGroupId: string; courseId: string }>();

  useEffect(() => {
    fetchDiscussionGroup(match.params.discussionGroupId);
  }, []);

  return (
    <Layout
      {...props}
      className="discussion-group-page"
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON, LayoutFeatures.HEADER]}
      header={Tools.str(state?.data?.discussionGroup?.title)}
    >
      <WebComponent
        data={state.data?.discussionGroup}
        loading={state.fetching}
        icon="forum"
        emptyMessage={translate('discussionGroupDoesNotExist')}
      >
        {(discussionGroup) => {
          return (
            <div className="discussion-group-page__content">
              <div className="discussion-content">
                <Panel>
                  <HTMLContentView content={discussionGroup.description} />
                  <DiscussionCommentForm />
                </Panel>
              </div>
              <div className="discussion-info">
                <Header size={3} padded>
                  {translate('moderators')}
                </Header>
                <SimpleUserView user={discussionGroup.creator} />
                <Header size={3} padded>
                  {translate('participants')}
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
