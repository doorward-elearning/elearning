import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import WebComponent from '@doorward/ui/components/WebComponent';
import AddGroupForm from '../../components/Forms/AddGroupForm';
import { PageComponent } from '@doorward/ui/types';
import useAction from '@doorward/ui/hooks/useActions';
import UserEntity from '@doorward/common/entities/user.entity';
import { GroupResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';
import useNavigation from '@doorward/ui/hooks/useNavigation';

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
  const navigation = useNavigation();
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
      header={`${currentGroupState ? translate('updateGroup') : translate('createGroup')}`}
    >
      <WebComponent
        data={{ allUsers: getUsers(state.data), group: currentGroupState?.data?.group }}
        hasData={(data) => !!data?.allUsers}
        loading={loading}
        emptyMessage={emptyMessage}
      >
        {({ allUsers, group }) => (
          <AddGroupForm
            onSuccess={() => navigation.navigate(redirectOnSuccess)}
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

export interface CreateGroupProps<T, Args extends Array<any> = any[]> extends PageComponent {
  emptyMessage: string;
  title: string;
  type: string;
  state: WebComponentState<T, T>;
  getUsers: (data: T) => Array<UserEntity>;
  actionCreator: ApiActionCreator<Args>;
  redirectOnSuccess: string;
  currentGroupState?: WebComponentState<GroupResponse>;
  actionArgs?: Args;
}

export default CreateGroup;
