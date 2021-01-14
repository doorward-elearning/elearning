import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import AddUserFormLayout from '../AddUserFormLayout';
import { StudentResponse } from '@doorward/common/dtos/response';
import { CreateUserBody } from '@doorward/common/dtos/body';
import DoorwardApi from '../../../services/apis/doorward.api';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = (props) => {
  const createStudent = useApiAction(DoorwardApi, (api) => api.students.createStudent);

  return <AddUserFormLayout {...props} action={props.action || createStudent.action} withPasswordField />;
};

export interface AddStudentFormState extends CreateUserBody {}

export interface AddStudentFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<StudentResponse>;
  onCancel: () => void;
  createData?: (data: any) => Array<any>;
  action?: ActionCreator;
}

export default AddStudentForm;
