import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import Api from '../../services/Api';
import { INITIATE_FREE_TRIAL } from './types';

const freeTrial = reducerApiAction({
  api: Api.freeTrial,
  action: INITIATE_FREE_TRIAL,
});

export default reducerBuilder({ middleware: { freeTrial } });
