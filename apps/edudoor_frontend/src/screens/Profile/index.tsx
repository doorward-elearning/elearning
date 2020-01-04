import React, { FunctionComponent, useState } from 'react';
import { PageComponent } from '../../../../../libs/ui/types';
import Layout, { LayoutFeatures } from '../Layout';
import UserCard from './UserCard';
import './styles/Profile.scss';
import Card from '../../../../../libs/ui/components/Card';
import Header from '../../../../../libs/ui/components/Header';
import ProfileAccountForm from '../../components/Forms/ProfileAccountForm';
import useForm from '../../../../../libs/ui/hooks/useForm';
import useAuth from '../../../../../libs/ui/hooks/useAuth';
import Icon from '../../../../../libs/ui/components/Icon';
import IfElse from '../../../../../libs/ui/components/IfElse';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const [editingAccount, setEditingAccount] = useState(false);
  const form = useForm();
  const { user } = useAuth();

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER]} header="My Profile">
      <div className="page-profile">
        <div className="page-profile__main">
          <UserCard user={user} />
        </div>
        <div className="page-profile__account">
          <Card>
            <Card.Header>
              <Header size={2}>Account Information</Header>
              <IfElse condition={!editingAccount}>
                <Icon icon="edit" onClick={(): void => setEditingAccount(true)} />
              </IfElse>
            </Card.Header>
            <Card.Body>
              <ProfileAccountForm
                form={form}
                user={user}
                editing={editingAccount}
                stopEditing={(): void => setEditingAccount(false)}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
