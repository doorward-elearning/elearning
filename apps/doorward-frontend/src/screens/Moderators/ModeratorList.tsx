import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { fetchModeratorListAction } from '../../reducers/moderators/actions';
import ModeratorsTable from '../../components/Tables/ModeratorsTable';
import WebComponent from '@doorward/ui/components/WebComponent';
import useAction from '@doorward/ui/hooks/useActions';
import { PageComponent } from '@doorward/ui/types';

const ModeratorList: React.FunctionComponent<MemberListProps> = props => {
  const moderatorList = useSelector((state: State) => state.moderators.moderatorList);
  const routes = useRoutes();

  const fetch = useAction(fetchModeratorListAction);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout
      {...props}
      header="All Moderators"
      suggestionsType="moderators"
      actionBtnProps={{
        text: 'Add Moderator',
        onClick: (): void => props.history.push(routes.routes.addModerator.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={moderatorList.data.moderators} loading={moderatorList.fetching}>
        {(moderators): JSX.Element => {
          return <ModeratorsTable moderators={moderators} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface MemberListProps extends PageComponent {}

export default ModeratorList;
