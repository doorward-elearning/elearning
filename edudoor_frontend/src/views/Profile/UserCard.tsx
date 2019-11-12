import React from 'react';
import Card from '../../components/ui/Card';
import EImage from '../../components/ui/Image';
import profile from '../../assets/images/profile.svg';
import Header from '../../components/ui/Header';
import './styles/UserCard.scss';
import ChangePasswordModal from '../../components/static/Modals/ChangePasswordModal';
import useForm from '../../hooks/useForm';
import { User } from '../../services/models';
import useModal from '../../hooks/useModal';

const UserCard: React.FunctionComponent<UserCardProps> = props => {
  const form = useForm();
  const modal = useModal();
  const { user } = props;
  return (
    <div className="page-profile__user-card">
      <ChangePasswordModal useModal={modal} useForm={form} />
      <Card>
        <Card.Header center>
          <Header size={2}>{user.fullName}</Header>
        </Card.Header>
        <Card.Body>
          <div className="profile-details">
            <EImage src={profile} alt="User Image" circle size="large" />
            <Header size={3}>{user.email}</Header>
            <span>{user.roles.map(role => role.name + ' ')}</span>
            <a href="#" onClick={modal.openModal}>
              Change password
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export interface UserCardProps {
  user: User;
}

export default UserCard;
