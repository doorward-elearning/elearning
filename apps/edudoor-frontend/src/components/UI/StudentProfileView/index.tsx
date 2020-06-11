import React, { useState } from 'react';
import './StudentProfileView.scss';
import { Student } from '@edudoor/common/models/Student';
import UserProfileCard from '../../user/UserProfileCard';
import useForm from '@edudoor/ui/hooks/useForm';
import { changeStudentsPassword } from '../../../reducers/students/actions';

const StudentProfileView: React.FunctionComponent<StudentProfileViewProps> = (props): JSX.Element => {
  const form = useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  return (
    <div className="ed-student__profile_view">
      <UserProfileCard
        form={form}
        submitPasswordAction={changeStudentsPassword}
        user={props.student}
        onPasswordChanged={() => {
          setPasswordModalOpen(false);
        }}
        dontEnterCurrentPassword
        openPasswordModal={passwordModalOpen}
        changePasswordCreateData={data => [props.student.id, { password: data.newPassword }]}
        onOpenPasswordModal={() => {
          setPasswordModalOpen(true);
        }}
      />
    </div>
  );
};

export interface StudentProfileViewProps {
  student: Student;
}

export default StudentProfileView;
