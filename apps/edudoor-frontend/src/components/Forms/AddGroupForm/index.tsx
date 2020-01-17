import React from 'react';
import TextField from '@edudoor/ui/components/Input/TextField';
import useForm from '@edudoor/ui/hooks/useForm';
import { User } from '@edudoor/common/models/User';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import UserChooser from '@edudoor/ui/components/UserChooser';

const AddGroupForm: React.FunctionComponent<AddGroupFormProps> = (props): JSX.Element => {
  const form = useForm();
  const state = useSelector((state: State) => state.groups.groupList);

  return (
    <div>
      <TextField name="name" placeholder="Name" />
      <UserChooser users={props.users} />
    </div>
  );
};

export interface AddGroupFormProps {
  users: Array<User>;
}

export default AddGroupForm;
