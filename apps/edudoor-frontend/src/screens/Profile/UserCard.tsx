import React from 'react';
import profile from '../../assets/images/profile.svg';
import './styles/UserCard.scss';
import ChangePasswordModal from '../../components/Modals/ChangePasswordModal';
import { useRouteMatch } from 'react-router';
import useRoutes from '../../hooks/useRoutes';
import { Link } from 'react-router-dom';
import EImage from '@edudoor/ui/components/Image';
import useModal from '@edudoor/ui/hooks/useModal';
import Row from '@edudoor/ui/components/Row';
import useForm from '@edudoor/ui/hooks/useForm';
import Pill from '@edudoor/ui/components/Pill';
import ItemArray from '@edudoor/ui/components/ItemArray';
import Card from '@edudoor/ui/components/Card';
import Header from '@edudoor/ui/components/Header';
import { User } from '@edudoor/common/models/User';

const UserCard: React.FunctionComponent<UserCardProps> = props => {
  const match: any = useRouteMatch();
  const routes = useRoutes();
  const form = useForm();
  const modal = useModal(match.path === routes.changePassword.link);
  const { user } = props;
  modal.onClose(() => {
    routes.navigate(routes.myProfile, { username: user.username });
  });
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
            <Row>
              <ItemArray data={user.roles}>
                {role => (
                  <div>
                    <Pill>{role.name}</Pill>
                  </div>
                )}
              </ItemArray>
            </Row>
            <Link to={routes.changePassword.withParams({ username: user.username })}>Change password</Link>
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
