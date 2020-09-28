import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './styles/Profile.scss';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import useRoutes from '../../hooks/useRoutes';
import UserProfileCard from '../../components/user/UserProfileCard';
import { useRouteMatch } from 'react-router';
import { UserCardContext } from '../../components/user/UserCard';
import useAuth from '../../hooks/useAuth';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const form = useForm();
  const { user } = useAuth();
  const routes = useRoutes();
  const match = useRouteMatch();

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="My Profile">
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
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
