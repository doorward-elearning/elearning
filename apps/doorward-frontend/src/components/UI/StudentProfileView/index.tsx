import React, { useState } from 'react';
import './StudentProfileView.scss';
import UserProfileCard from '../../user/UserProfileCard';
import useForm from '@doorward/ui/hooks/useForm';
import { UserCardContext } from '../../user/UserCard';
import { ChangePasswordFormContext } from '../../Forms/ChangePasswordForm';
import { ProfileAccountFormContext } from '../../Forms/ProfileAccountForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import UserEntity from '@doorward/common/entities/user.entity';
import { useApiAction } from 'use-api-action';

const StudentProfileView: React.FunctionComponent<StudentProfileViewProps> = (props): JSX.Element => {
  const form = useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [updateStudentPassword, updateStudentPasswordState] = useApiAction(
    DoorwardApi,
    (api) => api.students.updateStudentPassword
  );
  const [changeDetails, updateStudentState] = useApiAction(DoorwardApi, (api) => api.students.updateStudent);

  return (
    <div className="ed-student__profile_view">
      <UserCardContext
        changePassword
        onOpenChangePasswordModal={() => setPasswordModalOpen(true)}
        onPasswordChanged={() => setPasswordModalOpen(false)}
        openModal={passwordModalOpen}
      >
        <ProfileAccountFormContext
          submitAction={changeDetails}
          state={updateStudentState}
          createData={(values) => [props.student.id, values]}
        >
          <ChangePasswordFormContext
            submitAction={updateStudentPassword}
            createData={(data) => [props.student.id, { password: data?.newPassword }]}
            dontEnterCurrentPassword
            state={updateStudentPasswordState}
          >
            <UserProfileCard form={form} user={props.student} editable />
          </ChangePasswordFormContext>
        </ProfileAccountFormContext>
      </UserCardContext>
    </div>
  );
};

export interface StudentProfileViewProps {
  student: UserEntity;
}

export default StudentProfileView;
