import React from 'react';
import './UserCard.scss';
import useModal from '@doorward/ui/hooks/useModal';
import useForm from '@doorward/ui/hooks/useForm';
import Pill from '@doorward/ui/components/Pill';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import ChangePasswordModal from '../../Modals/ChangePasswordModal';
import WebComponent from '@doorward/ui/components/WebComponent';
import Button from '@doorward/ui/components/Buttons/Button';
import withContext from '@doorward/ui/hoc/withContext';
import UserEntity from '@doorward/common/entities/user.entity';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../../services/apis/doorward.api';
import { BasicProfilePicture } from '@doorward/ui/components/Input/ProfilePicture';

const UserCard: React.FunctionComponent<UserCardProps> = (props) => {
  const form = useForm();
  const modal = useModal(props.openModal);
  const { user } = props;
  const [getCurrentUser] = useApiAction(DoorwardApi, (api) => api.auth.getCurrentUser);
  const [updateProfilePicture] = useApiAction(DoorwardApi, (api) => api.userProfile.updateAccountProfilePicture, {
    onSuccess: getCurrentUser,
  });

  modal.onClose((passwordChanged) => {
    if (props.onPasswordChanged) {
      props.onPasswordChanged(passwordChanged);
    }
  });

  return (
    <WebComponent data={user} loading={!user}>
      {(data) => {
        return (
          <div className="page-profile__user-card">
            {props.changePassword && <ChangePasswordModal useModal={modal} useForm={form} />}
            <Card>
              <Card.Header center>
                <Header size={2}>{data?.fullName}</Header>
              </Card.Header>
              <Card.Body>
                <div className="profile-details">
                  <BasicProfilePicture
                    name="profilePicture"
                    user={user}
                    uploadHandler={DoorwardApi.api.files.uploadFile}
                    valueField="id"
                    onChange={(e) => {
                      updateProfilePicture({
                        profilePictureId: e.target.value,
                      });
                    }}
                  />
                  <Header size={3}>{data?.email || data?.phoneNumber}</Header>
                  <div>
                    <Pill>{data?.role?.displayName}</Pill>
                  </div>
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
  user: UserEntity;
  changePassword?: boolean;
  onPasswordChanged?: (passwordChanged?: boolean) => void;
  onOpenChangePasswordModal?: () => void;
  openModal?: boolean;
}

const { Context, ContextConsumer } = withContext(UserCard, {});

export const UserCardContext = Context;

export default ContextConsumer;
