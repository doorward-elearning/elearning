import React from 'react';
import { UseForm } from '../../../../../../libs/ui/hooks/useForm';
import { CreateStudentBody } from '../../../services/models/requestBody';
import { WebComponentState } from '@edudoor/ui/reducers/reducers';
import { StudentResponse } from '../../../services/models/responseBody';
import AddUserFormLayout from '../AddUserFormLayout';
import { addStudentAction } from '../../../reducers/students/actions';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = props => {
  return <AddUserFormLayout {...props} action={addStudentAction} />;
};

export interface AddStudentFormState extends CreateStudentBody {}

export interface AddStudentFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<StudentResponse>;
  onCancel: () => void;
  createData?: (data: any) => Array<any>;
}

export default AddStudentForm;
