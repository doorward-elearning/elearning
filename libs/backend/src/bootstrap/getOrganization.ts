import axios from 'axios';
import * as https from 'https';
import { OrganizationResponse } from '@doorward/common/dtos/response';

const getOrganization = async (baseURL: string) => {
  const data = await axios.get<OrganizationResponse>('/organizations/current', {
    baseURL,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const organization = data.data.organization;

  process.env.ORGANIZATION_ID = organization.id;

  return organization;
};

export default getOrganization;
