import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { useEffect } from 'react';
import { fetchForumAction } from '../reducers/forums/actions';
import useRoutes from './useRoutes';
import { CreateForumResponse } from '../services/models/responseBody';
import { ROUTES } from '../routes/routes';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';

const useViewForum = (): [string, WebComponentState<CreateForumResponse>] => {
  const { setTitle, setParams } = useRoutes();
  const match: any = useRouteMatch<{ forumId: string }>();
  const forumId = match.params.forumId;
  const fetchForum = useAction(fetchForumAction);
  useEffect(() => {
    if (forumId) {
      fetchForum(forumId);
    }
  }, []);

  const forum = useSelector((state: State) => state.forums.viewForum);

  useEffect(() => {
    if (forum.data.forum) {
      const forumData = forum.data.forum;
      setParams(ROUTES.viewForum.id, { forumId: forumData.id, ...match.params });
      setTitle(ROUTES.viewForum.id, forumData.title, ROUTES.viewForum.link);
    }
  }, [forum]);

  return [forumId, forum];
};

export default useViewForum;
