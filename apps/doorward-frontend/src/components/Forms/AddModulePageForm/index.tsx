import React from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import './AddModulePageForm.scss';
import TextField from '@doorward/ui/components/Input/TextField';
import AddModuleItemForm from '../AddModuleItemForm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { CreateModuleItemBody, CreatePageBody } from '@doorward/common/dtos/body';
import ModuleModel from '@doorward/common/models/module.model';
import { PageModel } from '@doorward/common/models/page.model';
import translate from '@doorward/common/lang/translate';

function AddModulePageForm<T extends AddModulePageFormState>({
  useForm,
  module,
  onSuccess,
  page,
  onCancel,
}: AddModulePageFormProps<T>) {
  const initialValues: Partial<CreatePageBody> = page || {
    title: translate.untitledPage(),
    page: null,
  };
  return (
    <AddModuleItemForm
      onSuccess={onSuccess}
      module={module}
      type={ModuleItemType.PAGE}
      key={page?.id}
      onCancel={onCancel}
      validationSchema={CreateModuleItemBody}
      item={page}
      initialValues={initialValues}
      form={useForm}
    >
      <div className="add-module-page">
        <TextField name="title" placeholder={translate.title()} />
        <DraftTextArea name="page" placeholder={translate.emptySpaceIsBoringAddSomeContent()} />
      </div>
    </AddModuleItemForm>
  );
}

export interface AddModulePageFormState extends CreatePageBody {}

export interface AddModulePageFormProps<T = any> {
  useForm: UseForm<T>;
  module: ModuleModel;
  onSuccess: () => void;
  onCancel: () => void;
  page?: PageModel;
}

export default AddModulePageForm;
