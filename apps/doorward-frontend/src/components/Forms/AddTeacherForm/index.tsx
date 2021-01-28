import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import AddUserFormLayout from '../AddUserFormLayout';
import { TeacherResponse } from '@doorward/common/dtos/response';
import DoorwardApi from '../../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';
import { WebComponentState } from 'use-api-action/types/types';

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
