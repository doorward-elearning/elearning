import axios from 'axios';

const getOrganization = async (baseURL: string) => {
  const data = await axios.get('/organization', {
    baseURL,
  });

  console.log(data);
};

export default getOrganization;
