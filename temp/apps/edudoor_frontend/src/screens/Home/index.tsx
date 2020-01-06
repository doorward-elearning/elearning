import React from 'react';
import { Redirect } from 'react-router';
import ROUTES from '@edudoor/ui/src/routes/routes';

const Home: React.FunctionComponent<HomeProps> = props => {
  return <Redirect to={ROUTES.login.link} />;
};

export interface HomeProps {}

export default Home;
