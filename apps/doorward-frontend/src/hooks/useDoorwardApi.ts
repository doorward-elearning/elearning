import { useSelector } from 'react-redux';
import { State } from '../store';

function useDoorwardApi<TState = State['DoorwardApi'], TSelected = unknown>(selector: (state: TState) => TSelected) {
  return useSelector((state: State) => selector(state.DoorwardApi as any));
}

export default useDoorwardApi;
