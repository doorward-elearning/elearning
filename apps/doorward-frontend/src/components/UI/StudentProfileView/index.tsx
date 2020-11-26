import React, { useState } from 'react';
import './StudentProfileView.scss';
import UserProfileCard from '../../user/UserProfileCard';
import useForm from '@doorward/ui/hooks/useForm';
import { UserCardContext } from '../../user/UserCard';
import { ChangePasswordFormContext } from '../../Forms/ChangePasswordForm';
import { ProfileAccountFormContext } from '../../Forms/ProfileAccountForm';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import UserEntity from '@doorward/common/entities/user.entity';

const StudentProfileView: React.FunctionComponent<StudentProfileViewProps> = (props): JSX.Element => {
  const form = useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const state = useDoorwardApi((state) => state.students.updateStudentPassword);
  const changeDetails = useDoorwardApi((state) => state.students.updateStudent);

  return (
    <div className="ed-student__profile_view">
      <UserCardContext
        changePassword
        onOpenChangePasswordModal={() => setPasswordModalOpen(true)}
        onPasswordChanged={() => setPasswordModalOpen(false)}
        openModal={passwordModalOpen}
      >
        <ProfileAccountFormContext
          submitAction={DoorwardApi.students.updateStudent}
          state={changeDetails}
          createData={(values) => [props.student.id, values]}
        >
          <ChangePasswordFormContext
            submitAction={DoorwardApi.students.updateStudentPassword}
            createData={(data) => [props.student.id, { password: data.newPassword }]}
            dontEnterCurrentPassword
            state={state}
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
