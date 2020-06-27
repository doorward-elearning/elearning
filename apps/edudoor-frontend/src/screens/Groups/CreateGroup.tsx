import React, { useEffect, useState } from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import WebComponent from '@edudoor/ui/components/WebComponent';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { PageComponent } from '@edudoor/ui/types';
import { User } from '@edudoor/common/models/User';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import { ActionCreator } from 'redux';
import useAction from '@edudoor/ui/hooks/useActions';
import { ROUTES } from '../../routes/routes';
import { GroupResponse } from '../../services/models/responseBody';

function CreateGroup<T>({
  state,
  actionCreator,
  emptyMessage,
  getUsers,
  redirectOnSuccess,
  title,
  type,
  currentGroupState,
  ...props
}: CreateGroupProps<T>) {
  const [loading, setLoading] = useState(true);
  const routes = useRoutes();
  const action = useAction(actionCreator);

  useEffect(() => {
    if (currentGroupState) {
      setLoading(state.fetching || currentGroupState.fetching);
    } else {
      setLoading(state.fetching);
    }
  }, [state, currentGroupState]);

  useEffect(() => {
    action();
  }, []);

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="Create Group">
      <WebComponent
        data={{ allUsers: getUsers(state.data), group: currentGroupState?.data?.group }}
        hasData={data => !!data.allUsers}
        loading={loading}
        emptyMessage={emptyMessage}
      >
        {({ allUsers, group }) => (
          <AddGroupForm
            onSuccess={() => routes.navigate(routes[redirectOnSuccess])}
            group={group}
            users={allUsers}
            title={title}
            type={type}
          />
        )}
      </WebComponent>
    </Layout>
  );
}

export interface CreateGroupProps<T> extends PageComponent {
  emptyMessage: string;
  title: string;
  type: string;
  state: WebComponentState<T>;
  getUsers: (data: T) => Array<User>;
  actionCreator: ActionCreator<any>;
  redirectOnSuccess: keyof typeof ROUTES;
  currentGroupState?: WebComponentState<GroupResponse>;
}

export default CreateGroup;
