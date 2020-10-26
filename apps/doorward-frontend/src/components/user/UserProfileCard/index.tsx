import React, { useState } from 'react';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import IfElse from '@doorward/ui/components/IfElse';
import Icon from '@doorward/ui/components/Icon';
import ProfileAccountForm from '../../Forms/ProfileAccountForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import './UserProfileCard.scss';
import UserCard from '../UserCard';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';

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
            <Header size={2}>{translate.accountInformation()}</Header>
            <IfElse condition={!editingAccount && props.editable}>
              <Icon icon="edit" onClick={(): void => setEditingAccount(true)} title={translate.edit()} />
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
  user?: UserEntity;
  form: UseForm<any>;
}

export default UserProfileCard;
