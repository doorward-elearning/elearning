import axios from 'axios';
import * as https from 'https';
import { OrganizationResponse } from '@doorward/common/dtos/response';

const MAX_TRIALS = 10;
const INTERVAL = 30;

const getOrganization = async (baseURL: string) => {
  for (let i = 0; i < MAX_TRIALS; i++) {
    try {
      const data = await axios.get<OrganizationResponse>('/organizations/current', {
        baseURL,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      const organization = data.data.organization;

      process.env.ORGANIZATION_ID = organization.id;

      return organization;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, INTERVAL));
    }
  }
};

export default getOrganization;
