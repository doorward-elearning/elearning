import React, { useState } from 'react';
import './MemberProfileView.scss';
import { Member } from '@doorward/common/models/Member';
import UserProfileCard from '../../user/UserProfileCard';
import useForm from '@doorward/ui/hooks/useForm';
import { UserCardContext, UserCardProps } from '../../user/UserCard';
import { ChangePasswordFormContext, ChangePasswordFormProps } from '../../Forms/ChangePasswordForm';
import { OptionalKeys } from '@doorward/common/types';
import { changeMembersAccountInformationAction, changeMembersPassword } from '../../../reducers/members/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { ProfileAccountFormContext } from '../../Forms/ProfileAccountForm';

const MemberProfileView: React.FunctionComponent<MemberProfileViewProps> = (props): JSX.Element => {
  const form = useForm();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const state = useSelector((state: State) => state.members.changePassword);
  const changeDetails = useSelector((state: State) => state.members.changeAccountDetails);

  return (
    <div className="ed-member__profile_view">
      <UserCardContext
        changePassword
        onOpenChangePasswordModal={() => setPasswordModalOpen(true)}
        onPasswordChanged={() => setPasswordModalOpen(false)}
        openModal={passwordModalOpen}
      >
        <ProfileAccountFormContext
          submitAction={changeMembersAccountInformationAction}
          state={changeDetails}
          createData={values => [props.member.id, values]}
        >
          <ChangePasswordFormContext
            submitAction={changeMembersPassword}
            createData={data => [props.member.id, { password: data.newPassword }]}
            dontEnterCurrentPassword
            state={state}
          >
            <UserProfileCard form={form} user={props.member} editable />
          </ChangePasswordFormContext>
        </ProfileAccountFormContext>
      </UserCardContext>
    </div>
  );
};

export interface MemberProfileViewProps {
  member: Member;
}

export default MemberProfileView;
