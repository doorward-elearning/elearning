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
import { useRouteMatch } from 'react-router';
import useRoutes from '../../hooks/useRoutes';
import { Link } from 'react-router-dom';
import ItemArray from '../../components/ui/ItemArray';
import Pill from '../../components/ui/Pill';
import Row from '../../components/ui/Row';

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
