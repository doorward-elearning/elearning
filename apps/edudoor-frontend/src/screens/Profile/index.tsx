import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import './styles/Profile.scss';
import useAuth from '@edudoor/ui/hooks/useAuth';
import useForm from '@edudoor/ui/hooks/useForm';
import { PageComponent } from '@edudoor/ui/types';
import useRoutes from '../../hooks/useRoutes';
import UserProfileCard from '../../components/user/UserProfileCard';
import { useRouteMatch } from 'react-router';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const form = useForm();
  const { user } = useAuth();
  const routes = useRoutes();
  const match = useRouteMatch();

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="My Profile">
      <UserProfileCard
        form={form}
        user={user}
        openPasswordModal={match.path === routes.changePassword.link}
        onOpenPasswordModal={() => {
          routes.navigate(routes.changePassword, { username: user.username });
        }}
        editable
        onPasswordChanged={() => {
          routes.navigate(routes.myProfile, { username: user.username });
        }}
      />
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
