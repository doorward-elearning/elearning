import React, { useEffect, useState } from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { PageComponent } from '@doorward/ui/types';
import { User } from '@doorward/common/models/User';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import { ROUTES } from '../../routes/routes';
import { GroupResponse } from '../../services/models/responseBody';

function CreateGroup<T, Args extends Array<any>>({
  state,
  actionCreator,
  emptyMessage,
  getUsers,
  redirectOnSuccess,
  title,
  type,
  currentGroupState,
  ...props
}: CreateGroupProps<T, Args>) {
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
    action(...((props.actionArgs || []) as Args));
  }, []);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={`${currentGroupState ? 'Update' : 'Create'} group`}
    >
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

export interface CreateGroupProps<T, Args = any[]> extends PageComponent {
  emptyMessage: string;
  title: string;
  type: string;
  state: WebComponentState<T>;
  getUsers: (data: T) => Array<User>;
  actionCreator: ActionCreator<Args>;
  redirectOnSuccess: keyof typeof ROUTES;
  currentGroupState?: WebComponentState<GroupResponse>;
  actionArgs?: Args;
}

export default CreateGroup;
