import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { CreateMemberBody } from '../../../services/models/requestBody';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import { MemberResponse } from '../../../services/models/responseBody';
import AddUserFormLayout from '../AddUserFormLayout';
import { addMemberAction } from '../../../reducers/members/actions';

const AddMemberForm: React.FunctionComponent<AddMemberFormProps> = props => {
  return <AddUserFormLayout {...props} action={props.action || addMemberAction} withPasswordField />;
};

export interface AddMemberFormState extends CreateMemberBody {}

export interface AddMemberFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<MemberResponse>;
  onCancel: () => void;
  createData?: (data: any) => Array<any>;
  action?: ActionCreator;
}

export default AddMemberForm;
