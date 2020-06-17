import React from 'react';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import { TeacherResponse } from '../../../services/models/responseBody';
import AddUserFormLayout from '../AddUserFormLayout';
import { createTeacherAction } from '../../../reducers/teachers/actions';

const AddTeacherForm: React.FunctionComponent<AddTeacherFormProps> = props => {
  return <AddUserFormLayout {...props} action={createTeacherAction} withPasswordField />;
};

export interface AddTeacherFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<TeacherResponse>;
  onCancel: () => void;
}

export default AddTeacherForm;
