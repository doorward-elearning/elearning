import ApiRequest from '@doorward/ui/services/apiRequest';
import { FreeTrial } from '@doorward/common/requests/body';
import { SchoolResponse } from '../../../doorward-frontend/src/services/models/responseBody';

const { POST } = ApiRequest;

const Api = {
  freeTrial: (data: FreeTrial): Promise<SchoolResponse> =>
    POST(`/schools?redirect_origin=${process.env.DOORWARD_APPLICATION_LINK}`, data),
};

export default Api;
