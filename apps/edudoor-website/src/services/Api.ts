import ApiRequest from '@edudoor/ui/services/apiRequest';
import { FreeTrial } from '@edudoor/common/requests/body';
import { Teacher } from '@edudoor/common/models/Teacher';
import { TeacherResponse } from '../../../edudoor-frontend/src/services/models/responseBody';

const { POST } = ApiRequest;

const Api = {
  freeTrial: (data: FreeTrial): Promise<TeacherResponse> => POST('/teachers', data),
};

export default Api;
