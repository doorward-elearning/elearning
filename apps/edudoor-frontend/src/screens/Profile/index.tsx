import React, { FunctionComponent, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import UserCard from './UserCard';
import './styles/Profile.scss';
import ProfileAccountForm from '../../components/Forms/ProfileAccountForm';
import IfElse from '@edudoor/ui/components/IfElse';
import useAuth from '@edudoor/ui/hooks/useAuth';
import Icon from '@edudoor/ui/components/Icon';
import useForm from '@edudoor/ui/hooks/useForm';
import { PageComponent } from '@edudoor/ui/types';
import Card from '@edudoor/ui/components/Card';
import Header from '@edudoor/ui/components/Header';

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
              <IfElse condition={user}>
                <ProfileAccountForm
                  form={form}
                  user={user}
                  editing={editingAccount}
                  stopEditing={(): void => setEditingAccount(false)}
                />
              </IfElse>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export interface ProfileProps extends PageComponent {}

export default Profile;
