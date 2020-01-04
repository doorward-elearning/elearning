import React from 'react';
import Card from '../../../../../libs/ui/components/Card';
import EImage from '../../../../../libs/ui/components/Image';
import profile from '../../assets/images/profile.svg';
import Header from '../../../../../libs/ui/components/Header';
import './styles/UserCard.scss';
import ChangePasswordModal from '../../components/Modals/ChangePasswordModal';
import useForm from '../../../../../libs/ui/hooks/useForm';
import { User } from '../../services/models';
import useModal from '../../../../../libs/ui/hooks/useModal';
import { useRouteMatch } from 'react-router';
import useRoutes from '../../../../../libs/ui/hooks/useRoutes';
import { Link } from 'react-router-dom';
import ItemArray from '../../../../../libs/ui/components/ItemArray';
import Pill from '../../../../../libs/ui/components/Pill';
import Row from '../../../../../libs/ui/components/Row';

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
