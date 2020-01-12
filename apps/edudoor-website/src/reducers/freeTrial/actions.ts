import { FreeTrial } from '@edudoor/common/requests/body';
import { INITIATE_FREE_TRIAL } from './types';
import { Action } from '@edudoor/ui/reducers/reducers';

export const initiateFreeTrial = (data: FreeTrial): Action => {
  return {
    type: INITIATE_FREE_TRIAL,
    payload: [data],
  };
};
