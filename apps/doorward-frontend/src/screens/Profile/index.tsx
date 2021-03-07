import React, { FunctionComponent, useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './styles/Profile.scss';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import UserProfileCard from '../../components/user/UserProfileCard';
import { useHistory, useRouteMatch } from 'react-router';
import { UserCardContext } from '../../components/user/UserCard';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../services/apis/doorward.api';
import WebComponent from '@doorward/ui/components/WebComponent';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const [user, setUser] = useState(null);
  const [me, setMe] = useState(false);
  const form = useForm();
  const navigation = useNavigation();
  const match = useRouteMatch<{ username: string }>();

  const [getUserProfile, profileState] = useApiAction(DoorwardApi, (api) => api.userProfile.getUserProfile, {
    onSuccess: (data) => {
      setUser(data?.user);
    },
  });

  useEffect(() => {
    getUserProfile(match.params.username);
  }, []);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]}
      header={translate(me ? 'myProfile' : 'userProfile')}
    >
      <WebComponent data={user} loading={profileState.fetching}>
        {(user) => (
          <UserCardContext
            openModal={match.path === ROUTES.profile.changePassword}
            onOpenChangePasswordModal={() => {
              navigation.navigate(ROUTES.profile.changePassword, { username: user.username });
            }}
            onPasswordChanged={() => {
              navigation.navigate(ROUTES.profile.view, { username: user.username });
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
