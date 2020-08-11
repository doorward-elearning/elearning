import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddConference from './AddConference';
import { useSelector } from 'react-redux';
import { fetchConferencesAction } from '../../reducers/conferences/actions';
import ConferenceTable from '../../components/Tables/ConferenceTable';
import { State } from '../../store';
import WebComponent from '@doorward/ui/components/WebComponent';
import { ROUTES } from '../../routes/routes';
import useModal from '@doorward/ui/hooks/useModal';
import useAction from '@doorward/ui/hooks/useActions';
import { Roles } from '@doorward/ui/components/RolesManager';
import { PageComponent } from '@doorward/ui/types';

const Conferences: React.FunctionComponent<ConferencesProps> = props => {
  const addConferenceModal = useModal(props.location.pathname === ROUTES.createConference.link);
  const fetchConferences = useAction(fetchConferencesAction);
  const conferences = useSelector((state: State) => state.conferences.conferenceList);

  useEffect(() => {
    fetchConferences();
  }, [props.location.pathname]);

  const TITLE = 'CREATE A NEW CONFERENCE';
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header="CONFERENCES"
      actionBtnProps={{
        text: TITLE,
        onClick: (): void => props.history.push(ROUTES.createConference.link),
        roles: [Roles.SUPER_ADMINISTRATOR, Roles.MODERATOR],
      }}
    >
      <AddConference history={props.history} useModal={addConferenceModal} title={TITLE} />
      <WebComponent data={conferences.data.conferences} loading={conferences.fetching} modelName="Conferences">
        {(list): JSX.Element => {
          return <ConferenceTable conferences={list} history={props.history} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ConferencesProps extends PageComponent {}

export default Conferences;
