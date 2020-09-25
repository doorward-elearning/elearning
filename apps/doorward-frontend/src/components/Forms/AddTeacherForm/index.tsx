import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import AddUserFormLayout from '../AddUserFormLayout';
import { TeacherResponse } from '@doorward/common/dtos/response';
import DoorwardApi from '../../../services/apis/doorward.api';

const AddTeacherForm: React.FunctionComponent<AddTeacherFormProps> = (props) => {
  return <AddUserFormLayout {...props} action={DoorwardApi.teachers.createTeacherAccount} withPasswordField />;
};

export interface AddTeacherFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<TeacherResponse>;
  onCancel: () => void;
}

export default AddTeacherForm;
