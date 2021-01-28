import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import AddUserFormLayout from '../AddUserFormLayout';
import { StudentResponse } from '@doorward/common/dtos/response';
import { CreateUserBody } from '@doorward/common/dtos/body';
import DoorwardApi from '../../../services/apis/doorward.api';
import { useApiAction } from 'use-api-action';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = (props) => {
  const [createStudent] = useApiAction(DoorwardApi, (api) => api.students.createStudent);

  return <AddUserFormLayout {...props} action={props.action || createStudent} withPasswordField />;
};

export interface AddStudentFormState extends CreateUserBody {}

export interface AddStudentFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<StudentResponse, StudentResponse>;
  onCancel: () => void;
  createData?: (data: any) => Array<any>;
  action?: ApiActionCreator<any, any, any>;
}

export default AddStudentForm;
