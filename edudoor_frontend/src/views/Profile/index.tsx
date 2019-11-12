import React, { FunctionComponent, useState } from 'react';
import { PageComponent } from '../../types';
import Layout, { LayoutFeatures } from '../Layout';
import UserCard from './UserCard';
import './styles/Profile.scss';
import Card from '../../components/ui/Card';
import Header from '../../components/ui/Header';
import ProfileAccountForm from '../../components/static/Forms/ProfileAccountForm';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import Icon from '../../components/ui/Icon';
import IfElse from '../../components/ui/IfElse';

const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element => {
  const [editingAccount, setEditingAccount] = useState(false);
  const form = useForm();
  const { user } = useAuth();

  return (
    <Layout {...props} features={[LayoutFeatures.BREAD_CRUMBS]}>
      <div className="page-profile">
        <div className="page-profile__main">
          <UserCard user={user} />
        </div>
        <div className="page-profile__account">
          <Card>
            <Card.Header>
              <Header size={2}>Account Information</Header>
              <IfElse condition={!editingAccount}>
                <Icon icon="edit" onClick={() => setEditingAccount(true)} />
              </IfElse>
            </Card.Header>
            <Card.Body>
              <ProfileAccountForm
                form={form}
                user={user}
                editing={editingAccount}
                stopEditing={() => setEditingAccount(false)}
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
