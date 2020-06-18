import React, { useState } from 'react';
import Card from '@edudoor/ui/components/Card';
import Header from '@edudoor/ui/components/Header';
import IfElse from '@edudoor/ui/components/IfElse';
import Icon from '@edudoor/ui/components/Icon';
import ProfileAccountForm from '../../Forms/ProfileAccountForm';
import { User } from '@edudoor/common/models/User';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import './UserProfileCard.scss';
import UserCard from '../UserCard';

const UserProfileCard: React.FunctionComponent<UserProfileCardProps> = ({ user, form, ...props }): JSX.Element => {
  const [editingAccount, setEditingAccount] = useState(false);
  return (
    <div className="ed-userProfileCard">
      <div className="ed-userProfileCard__main">
        <UserCard user={user} />
      </div>
      <div className="ed-userProfileCard__account">
        <Card>
          <Card.Header>
            <Header size={2}>Account Information</Header>
            <IfElse condition={!editingAccount && props.editable}>
              <Icon icon="edit" onClick={(): void => setEditingAccount(true)} title="Edit" />
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
  );
};

export interface UserProfileCardProps {
  editable?: boolean;
  user?: User;
  form: UseForm<any>;
}

export default UserProfileCard;
