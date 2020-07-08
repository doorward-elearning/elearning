import React from 'react';
import profile from '../../../assets/images/profile.svg';
import './UserCard.scss';
import EImage from '@doorward/ui/components/Image';
import useModal from '@doorward/ui/hooks/useModal';
import Row from '@doorward/ui/components/Row';
import useForm from '@doorward/ui/hooks/useForm';
import Pill from '@doorward/ui/components/Pill';
import ItemArray from '@doorward/ui/components/ItemArray';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { User } from '@doorward/common/models/User';
import ChangePasswordModal from '../../Modals/ChangePasswordModal';
import WebComponent from '@doorward/ui/components/WebComponent';
import Button from '@doorward/ui/components/Buttons/Button';
import withContext from '@doorward/ui/hoc/withContext';

const UserCard: React.FunctionComponent<UserCardProps> = props => {
  const form = useForm();
  const modal = useModal(props.openModal);
  const { user } = props;

  modal.onClose(passwordChanged => {
    if (props.onPasswordChanged) {
      props.onPasswordChanged(passwordChanged);
    }
  });

  return (
    <WebComponent data={user} loading={!user}>
      {data => {
        return (
          <div className="page-profile__user-card">
            {props.changePassword && <ChangePasswordModal useModal={modal} useForm={form} />}
            <Card>
              <Card.Header center>
                <Header size={2}>{data.fullName}</Header>
              </Card.Header>
              <Card.Body>
                <div className="profile-details">
                  <EImage src={profile} alt="User Image" circle size="large" />
                  <Header size={3}>{data.email}</Header>
                  <Row>
                    <ItemArray data={data.roles}>
                      {role => (
                        <div>
                          <Pill>{role.name}</Pill>
                        </div>
                      )}
                    </ItemArray>
                  </Row>
                </div>
              </Card.Body>
              <Card.Footer>
                {props.changePassword && (
                  <Button
                    mini
                    theme="accent"
                    icon="lock"
                    onClick={() => {
                      if (props.onOpenChangePasswordModal) {
                        props.onOpenChangePasswordModal();
                      }
                    }}
                  >
                    Change password
                  </Button>
                )}
              </Card.Footer>
            </Card>
          </div>
        );
      }}
    </WebComponent>
  );
};

export interface UserCardProps {
  user: User;
  changePassword?: boolean;
  onPasswordChanged?: (passwordChanged?: boolean) => void;
  onOpenChangePasswordModal?: () => void;
  openModal?: boolean;
}

const { Context, ContextConsumer } = withContext(UserCard, {});

export const UserCardContext = Context;

export default ContextConsumer;