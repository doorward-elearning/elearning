import React from 'react';
import profile from '../../../assets/images/profile.svg';
import './UserCard.scss';
import EImage from '@edudoor/ui/components/Image';
import useModal from '@edudoor/ui/hooks/useModal';
import Row from '@edudoor/ui/components/Row';
import useForm from '@edudoor/ui/hooks/useForm';
import Pill from '@edudoor/ui/components/Pill';
import ItemArray from '@edudoor/ui/components/ItemArray';
import Card from '@edudoor/ui/components/Card';
import Header from '@edudoor/ui/components/Header';
import { User } from '@edudoor/common/models/User';
import ChangePasswordModal from '../../Modals/ChangePasswordModal';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Button from '@edudoor/ui/components/Buttons/Button';
import withContext from '@edudoor/ui/hoc/withContext';

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
