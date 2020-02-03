import React, { useEffect } from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import WebComponent from '@edudoor/ui/components/WebComponent';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { PageComponent } from '@edudoor/ui/types';
import { User } from '@edudoor/common/models/User';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { ActionCreator } from 'redux';
import useAction from '@edudoor/ui/hooks/useActions';
import { ROUTES } from '../../routes/routes';

function CreateGroup<T>({
  getState,
  getUsers,
  emptyMessage,
  title,
  actionCreator,
  type,
  redirectOnSuccess,
}: CreateGroupHOCProps<T>): React.FunctionComponent<CreateGroupProps> {
  return props => {
    const routes = useRoutes();
    const state = useSelector(getState);
    const action = useAction(actionCreator);

    useEffect(() => {
      action();
    }, []);

    return (
      <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Create Group">
        <WebComponent data={getUsers(state.data)} loading={state.fetching} emptyMessage={emptyMessage}>
          {students => (
            <AddGroupForm
              onSuccess={() => routes.navigate(routes[redirectOnSuccess])}
              users={students}
              title={title}
              type={type}
            />
          )}
        </WebComponent>
      </Layout>
    );
  };
}

export interface CreateGroupHOCProps<T> {
  emptyMessage: string;
  title: string;
  type: string;
  getState: (state: State) => WebComponentState<T>;
  getUsers: (data: T) => Array<User>;
  actionCreator: ActionCreator<any>;
  redirectOnSuccess: keyof typeof ROUTES;
}

export interface CreateGroupProps extends PageComponent {}

export default CreateGroup;
