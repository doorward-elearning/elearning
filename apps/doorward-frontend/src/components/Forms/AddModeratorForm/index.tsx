import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import { ModeratorResponse } from '../../../services/models/responseBody';
import AddUserFormLayout from '../AddUserFormLayout';
import { createModeratorAction } from '../../../reducers/moderators/actions';

const AddModeratorForm: React.FunctionComponent<AddModeratorFormProps> = props => {
  return <AddUserFormLayout {...props} action={createModeratorAction} withPasswordField />;
};

export interface AddModeratorFormProps {
  useForm: UseForm<any>;
  state: WebComponentState<ModeratorResponse>;
  onCancel: () => void;
}

export default AddModeratorForm;
