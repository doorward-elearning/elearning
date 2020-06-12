import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './styles/Profile.scss';
import useAuth from '@edudoor/ui/hooks/useAuth';
import useForm from '@edudoor/ui/hooks/useForm';
import { PageComponent } from '@edudoor/ui/types';
import useRoutes from '../../hooks/useRoutes';
import UserProfileCard from '../../components/user/UserProfileCard';
import { useRouteMatch } from 'react-router';
import { UserCardContext } from '../../components/user/UserCard';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const form = useForm();
  const { user } = useAuth();
  const routes = useRoutes();
  const match = useRouteMatch();

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="My Profile">
      <UserCardContext
        value={{
          openModal: match.path === routes.changePassword.link,
          onOpenChangePasswordModal: () => {
            routes.navigate(routes.changePassword, { username: user.username });
          },
          onPasswordChanged: () => {
            routes.navigate(routes.myProfile, { username: user.username });
          },
          changePassword: true,
        }}
      >
        <UserProfileCard form={form} user={user} editable />
      </UserCardContext>
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
