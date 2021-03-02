import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Home: React.FunctionComponent<HomeProps> = (props) => {
  const [hasWebsite, setHasWebsite] = useState(true);

  axios
    .get(process.env.DOORWARD_WEBSITE_LINK)
    .then(() => {
      window.location.href = process.env.DOORWARD_WEBSITE_LINK;
    })
    .catch(() => {
      setHasWebsite(false);
    });
  return hasWebsite ? <React.Fragment /> : <Redirect to="/login" />;
};

export interface HomeProps {}

export default Home;
