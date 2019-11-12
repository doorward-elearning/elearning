import React, { FunctionComponent } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="My Profile">
      Profile
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
