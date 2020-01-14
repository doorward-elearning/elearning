import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from "react-router";
import {ROUTES} from "../../routes/routes";

const Home: React.FunctionComponent<HomeProps> = props => {
  const [hasWebsite, setHasWebsite ] = useState(true);

  axios.get(process.env.EDUDOOR_WEBSITE_LINK).then(() => {
    window.location.href = process.env.EDUDOOR_WEBSITE_LINK;
  }).catch(() => {
      setHasWebsite(false);
  });
  return hasWebsite ? <React.Fragment/> : <Redirect to={ROUTES.login.link} />;
};

export interface HomeProps {}

export default Home;
