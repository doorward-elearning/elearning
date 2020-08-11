import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import AuthoredForumsReportTable from '../../components/Tables/AuthoredForumsReportTable';
import { fetchForumCreatorReport } from '../../reducers/reports/actions';
import useRoutes from '../../hooks/useRoutes';
import WebComponent from '@doorward/ui/components/WebComponent';
import Tools from '@doorward/common/utils/Tools';
import usePageResource from '../../hooks/usePageResource';
import useBreadCrumbTitle from '@doorward/ui/hooks/useBreadCrumbTitle';
import { PageComponent } from '@doorward/ui/types';

const ModeratorReport: FunctionComponent<ModeratorReportProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.reports.singleModerator);
  const routes = useRoutes();
  usePageResource('moderatorId', fetchForumCreatorReport);
  useBreadCrumbTitle(state, state => state.data.moderator?.fullName, routes);

  const forumCreator = state.data.moderator;
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={Tools.str(forumCreator?.fullName)}
    >
      <WebComponent data={forumCreator} loading={state.fetching}>
        {data => (
          <div className="forum-creator-report__content">
            <AuthoredForumsReportTable forums={data.authoredForums} />
          </div>
        )}
      </WebComponent>
    </Layout>
  );
};

export interface ModeratorReportProps extends PageComponent {}

export default ModeratorReport;
