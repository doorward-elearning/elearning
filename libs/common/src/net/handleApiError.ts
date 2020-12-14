import DApiResponse from '@doorward/common/dtos/response/base.response';
import translate from '@doorward/common/lang/translate';
import { AxiosError } from 'axios';

const handleApiError = (error: AxiosError) => {
  let data: DApiResponse;
  if (error.response) {
    data = error.response.data;
  } else {
    data = {
      success: false,
      message: translate('serverFacingTechnicalIssue'),
      timestamp: new Date(),
      statusCode: 500,
    };
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return data;
};

export default handleApiError;
