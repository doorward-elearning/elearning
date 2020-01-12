import ApiRequest from '@edudoor/ui/services/apiRequest';
import { FreeTrial } from '@edudoor/common/requests/body';
import { TeacherResponse } from '../../../edudoor-frontend/src/services/models/responseBody';

const { POST } = ApiRequest;

const Api = {
  freeTrial: (data: FreeTrial): Promise<TeacherResponse> =>
    POST(`/users/teachers/free-trial?redirect_origin=${process.env.EDUDOOR_APPLICATION_LINK}`, data),
};

export default Api;
