import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import AddUserFormLayout from '../AddUserFormLayout';
import { TeacherResponse } from '@doorward/common/dtos/response';
import DoorwardApi from '../../../services/apis/doorward.api';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const AddTeacherForm: React.FunctionComponent<AddTeacherFormProps> = (props) => {
  const createTeacher = useApiAction(DoorwardApi, (api) => api.teachers.createTeacherAccount);

  return <AddUserFormLayout {...props} action={createTeacher.action} withPasswordField />;
};

export interface AddTeacherFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<TeacherResponse>;
  onCancel: () => void;
}

export default AddTeacherForm;
