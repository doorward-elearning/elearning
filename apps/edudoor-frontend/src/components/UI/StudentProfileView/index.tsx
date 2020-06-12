import React, { useState } from 'react';
import './StudentProfileView.scss';
import { Student } from '@edudoor/common/models/Student';
import UserProfileCard from '../../user/UserProfileCard';
import useForm from '@edudoor/ui/hooks/useForm';
import { UserCardContext, UserCardProps } from '../../user/UserCard';
import { ChangePasswordFormContext, ChangePasswordFormProps } from '../../Forms/ChangePasswordForm';
import { OptionalKeys } from '@edudoor/common/types';
import { changeStudentsPassword } from '../../../reducers/students/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';

const StudentProfileView: React.FunctionComponent<StudentProfileViewProps> = (props): JSX.Element => {
  const form = useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const state = useSelector((state: State) => state.students.changePassword);

  const userCardContext: OptionalKeys<UserCardProps> = {
    changePassword: true,
    onOpenChangePasswordModal: () => {
      setPasswordModalOpen(true);
    },
    onPasswordChanged: () => {
      setPasswordModalOpen(false);
    },
    openModal: passwordModalOpen,
  };

  const changePasswordForm: OptionalKeys<ChangePasswordFormProps> = {
    submitAction: changeStudentsPassword,
    createData: data => [props.student.id, { password: data.newPassword }],
    dontEnterCurrentPassword: true,
    state,
  };
  return (
    <div className="ed-student__profile_view">
      <UserCardContext value={userCardContext}>
        <ChangePasswordFormContext value={changePasswordForm}>
          <UserProfileCard form={form} user={props.student} />
        </ChangePasswordFormContext>
      </UserCardContext>
    </div>
  );
};

export interface StudentProfileViewProps {
  student: Student;
}

export default StudentProfileView;
