import React, { useState } from 'react';
import './StudentProfileView.scss';
import { Student } from '@doorward/common/models/Student';
import UserProfileCard from '../../user/UserProfileCard';
import useForm from '@doorward/ui/hooks/useForm';
import { UserCardContext, UserCardProps } from '../../user/UserCard';
import { ChangePasswordFormContext, ChangePasswordFormProps } from '../../Forms/ChangePasswordForm';
import { OptionalKeys } from '@doorward/common/types';
import { changeStudentsAccountInformationAction, changeStudentsPassword } from '../../../reducers/students/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { ProfileAccountFormContext } from '../../Forms/ProfileAccountForm';

const StudentProfileView: React.FunctionComponent<StudentProfileViewProps> = (props): JSX.Element => {
  const form = useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const state = useSelector((state: State) => state.students.changePassword);
  const changeDetails = useSelector((state: State) => state.students.changeAccountDetails);

  return (
    <div className="ed-student__profile_view">
      <UserCardContext
        changePassword
        onOpenChangePasswordModal={() => setPasswordModalOpen(true)}
        onPasswordChanged={() => setPasswordModalOpen(false)}
        openModal={passwordModalOpen}
      >
        <ProfileAccountFormContext
          submitAction={changeStudentsAccountInformationAction}
          state={changeDetails}
          createData={values => [props.student.id, values]}
        >
          <ChangePasswordFormContext
            submitAction={changeStudentsPassword}
            createData={data => [props.student.id, { password: data.newPassword }]}
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
  student: Student;
}

export default StudentProfileView;
