import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Home: React.FunctionComponent<HomeProps> = (props) => {
  const [hasWebsite, setHasWebsite] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.DOORWARD_WEBSITE_LINK, {
        timeout: 3000,
      })
      .then(() => {
        window.location.href = process.env.DOORWARD_WEBSITE_LINK;
      })
      .catch(() => {
        setHasWebsite(false);
      });
  }, []);

  if (hasWebsite) {
    return <React.Fragment />;
  }

  return <Redirect to="/login" />;
};

export interface HomeProps {}

export default Home;
