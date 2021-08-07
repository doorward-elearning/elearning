import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import AddUserFormLayout from '../AddUserFormLayout';
import { TeacherResponse } from '@doorward/common/dtos/response';
import DoorwardApi from '../../../services/apis/doorward.api';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { WebComponentState } from '@doorward/api-actions/types';

const AddTeacherForm: React.FunctionComponent<AddTeacherFormProps> = (props) => {
  const [createTeacher] = useApiAction(DoorwardApi, (api) => api.teachers.createTeacherAccount);

  return <AddUserFormLayout {...props} action={createTeacher} withPasswordField />;
};

export interface AddTeacherFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<TeacherResponse, TeacherResponse>;
  onCancel: () => void;
}

export default AddTeacherForm;
