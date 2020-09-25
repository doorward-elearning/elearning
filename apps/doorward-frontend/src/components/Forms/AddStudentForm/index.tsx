import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import AddUserFormLayout from '../AddUserFormLayout';
import { StudentResponse } from '@doorward/common/dtos/response';
import { CreateUserBody } from '@doorward/common/dtos/body';
import DoorwardApi from '../../../services/apis/doorward.api';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = (props) => {
  return <AddUserFormLayout {...props} action={props.action || DoorwardApi.students.createStudent} withPasswordField />;
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
