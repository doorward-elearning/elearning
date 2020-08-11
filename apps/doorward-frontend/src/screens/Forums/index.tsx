import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddForum from './AddForum';
import { useSelector } from 'react-redux';
import { fetchForumsAction } from '../../reducers/forums/actions';
import ForumTable from '../../components/Tables/ForumTable';
import { State } from '../../store';
import WebComponent from '@doorward/ui/components/WebComponent';
import { ROUTES } from '../../routes/routes';
import useModal from '@doorward/ui/hooks/useModal';
import useAction from '@doorward/ui/hooks/useActions';
import { Roles } from '@doorward/ui/components/RolesManager';
import { PageComponent } from '@doorward/ui/types';

const Forums: React.FunctionComponent<ForumsProps> = props => {
  const addForumModal = useModal(props.location.pathname === ROUTES.createForum.link);
  const fetchForums = useAction(fetchForumsAction);
  const forums = useSelector((state: State) => state.forums.forumList);

  useEffect(() => {
    fetchForums();
  }, [props.location.pathname]);

  const TITLE = 'CREATE A NEW MEETING';
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header="MEETINGS"
      actionBtnProps={{
        text: TITLE,
        onClick: (): void => props.history.push(ROUTES.createForum.link),
        roles: [Roles.SUPER_ADMINISTRATOR, Roles.MODERATOR],
      }}
    >
      <AddForum history={props.history} useModal={addForumModal} title={TITLE} />
      <WebComponent data={forums.data.forums} loading={forums.fetching} modelName="Meetings">
        {(list): JSX.Element => {
          return <ForumTable forums={list} history={props.history} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ForumsProps extends PageComponent {}

export default Forums;
