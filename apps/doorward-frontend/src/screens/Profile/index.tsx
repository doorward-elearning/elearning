import React, { FunctionComponent, useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './styles/Profile.scss';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import useRoutes from '../../hooks/useRoutes';
import UserProfileCard from '../../components/user/UserProfileCard';
import { useRouteMatch } from 'react-router';
import { UserCardContext } from '../../components/user/UserCard';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';
import DoorwardApi from '../../services/apis/doorward.api';
import WebComponent from '@doorward/ui/components/WebComponent';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const [user, setUser] = useState(null);
  const [me, setMe] = useState(false);
  const form = useForm();
  const routes = useRoutes();
  const match = useRouteMatch<{ username: string }>();

  const getUserProfile = useApiAction(DoorwardApi, (api) => api.userProfile.getUserProfile, {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  useEffect(() => {
    getUserProfile.action(match.params.username);
  }, []);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={translate(me ? 'myProfile' : 'userProfile')}
    >
      <WebComponent data={user} loading={getUserProfile.state.fetching}>
        {(user) => (
          <UserCardContext
            openModal={match.path === routes.changePassword.link}
            onOpenChangePasswordModal={() => {
              routes.navigate(routes.changePassword, { username: user.username });
            }}
            onPasswordChanged={() => {
              routes.navigate(routes.myProfile, { username: user.username });
            }}
            changePassword
          >
            <UserProfileCard form={form} user={user} editable />
          </UserCardContext>
        )}
      </WebComponent>
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
