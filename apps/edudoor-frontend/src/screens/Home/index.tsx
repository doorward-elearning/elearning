import React from 'react';

const Home: React.FunctionComponent<HomeProps> = props => {
  window.location.href = process.env.EDUDOOR_WEBSITE_LINK;
  return <React.Fragment/>;
};

export interface HomeProps {}

export default Home;
