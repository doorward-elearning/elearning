import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { useEffect } from 'react';
import { fetchConferenceAction } from '../reducers/conferences/actions';
import useRoutes from './useRoutes';
import { CreateConferenceResponse } from '../services/models/responseBody';
import { ROUTES } from '../routes/routes';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';

const useViewConference = (): [string, WebComponentState<CreateConferenceResponse>] => {
  const { setTitle, setParams } = useRoutes();
  const match: any = useRouteMatch<{ conferenceId: string }>();
  const conferenceId = match.params.conferenceId;
  const fetchConference = useAction(fetchConferenceAction);
  useEffect(() => {
    if (conferenceId) {
      fetchConference(conferenceId);
    }
  }, []);

  const conference = useSelector((state: State) => state.conferences.viewConference);

  useEffect(() => {
    if (conference.data.conference) {
      const conferenceData = conference.data.conference;
      setParams(ROUTES.viewConference.id, { conferenceId: conferenceData.id, ...match.params });
      setTitle(ROUTES.viewConference.id, conferenceData.title, ROUTES.viewConference.link);
    }
  }, [conference]);

  return [conferenceId, conference];
};

export default useViewConference;
