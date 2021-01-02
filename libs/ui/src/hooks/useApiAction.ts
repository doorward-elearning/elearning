import { Action, WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import { useSelector } from 'react-redux';
import { Api, ApiActions, EndpointData } from '@doorward/ui/reducers/apiReducer';

function useApiAction<
  T extends Api,
  Group extends keyof T,
  Endpoint extends keyof T[Group],
  TSelected extends WebComponentState<EndpointData<T[Group][Endpoint]>>
>(
  api: ApiActions<T>,
  group: Group,
  endpoint: Endpoint,
  actionParams?: { [n in keyof Action]?: any }
): {
  action: (...args: Parameters<T[Group][Endpoint]>) => Action;
  state: TSelected;
} {
  const actionCreator = useAction(api[group][endpoint], actionParams);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const apiName = (api[group][endpoint].type as string).split('_')[0];

  const endpointState: TSelected = useSelector((state) => state[apiName][group][endpoint]);

  return { action: actionCreator, state: endpointState };
}

export default useApiAction;
