import { Action, WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import { useSelector } from 'react-redux';
import { Api, ApiEndpointDefinition, ApiReducerContext, EndpointData } from '@doorward/ui/reducers/apiReducer';

function useApiAction<
  T extends Api,
  Group extends keyof T,
  Endpoint extends keyof T[Group],
  TSelected extends WebComponentState<EndpointData<T[Group][Endpoint]>>
>(
  api: ApiReducerContext<T>,
  getEndpoint: (api: ApiEndpointDefinition<T>) => [Group, Endpoint],
  actionParams?: { [n in keyof Action]?: any }
): {
  action: (...args: Parameters<T[Group][Endpoint]>) => Action;
  state: TSelected;
} {
  const [group, endpoint] = getEndpoint(api.endpoints);

  const actionCreator = useAction(api.actions[group][endpoint], actionParams);

  const endpointState: TSelected = useSelector((state) => state[api.name][group][endpoint]);

  return { action: actionCreator, state: endpointState };
}

export default useApiAction;
