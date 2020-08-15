import React from 'react';
import Layout from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import './Home.scss';
import Panel from '@doorward/ui/components/Panel';
import MeetingInfoForm from '../../components/MeetingInfoForm';

const Home: React.FunctionComponent<HomeProps> = (props): JSX.Element => {
  return (
    <Layout {...props} withBackground>
      <div className="page__home">
        <h1 className="application__name">Doorward</h1>
        <h1 className="header">Join a Meeting</h1>
        <p>Create a new meeting or join an existing one by entering the meeting id.</p>
        <div className="meeting-form">
          <Panel>
            <MeetingInfoForm />
          </Panel>
        </div>
      </div>
    </Layout>
  );
};

export interface HomeProps extends PageComponent {}

export default Home;
