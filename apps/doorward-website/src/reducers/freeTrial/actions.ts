import { FreeTrial } from '@doorward/common/requests/body';
import { INITIATE_FREE_TRIAL } from './types';
import { Action } from '@doorward/ui/reducers/reducers';

export const initiateFreeTrial = (data: FreeTrial): Action => {
  return {
    type: INITIATE_FREE_TRIAL,
    payload: [data],
  };
};
