import ApiRequest from '@edudoor/ui/services/apiRequest';
import { FreeTrial } from '@edudoor/common/requests/body';
import { SchoolResponse } from '../../../edudoor-frontend/src/services/models/responseBody';

const { POST } = ApiRequest;

const Api = {
  freeTrial: (data: FreeTrial): Promise<SchoolResponse> =>
    POST(`/schools?redirect_origin=${process.env.EDUDOOR_APPLICATION_LINK}`, data),
};

export default Api;
