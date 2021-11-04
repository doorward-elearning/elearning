import React, { useState } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import './AddModulePageForm.scss';
import TextField from '@doorward/ui/components/Input/TextField';
import AddModuleItemForm from '../AddModuleItemForm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import { CreateModuleItemBody, CreatePageBody } from '@doorward/common/dtos/body';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';
import translate from '@doorward/common/lang/translate';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import { FileUploadButton } from '@doorward/ui/components/Input/FileUploadField';
import DoorwardApi from '../../../services/apis/doorward.api';
import { SimpleFileResponse } from '@doorward/common/dtos/response';
import PDFViewer from '@doorward/ui/components/PDFViewer';

function AddModulePageForm<T extends AddModulePageFormState>({
  useForm,
  module,
  onSuccess,
  page,
  onCancel,
}: AddModulePageFormProps<T>) {
  const [pdfs, setPdfs] = useState<Array<SimpleFileResponse>>([]);

  const initialValues: Partial<CreatePageBody> = page || {
    title: translate('untitledPage'),
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
        <TextField name="title" placeholder={translate('title')} />
        <TabLayout selected={1}>
          <Tab title={translate('textInput')}>
            <div style={{ width: '100%' }}>
              <DraftTextArea fluid name="page" placeholder={translate('emptySpaceIsBoringAddSomeContent')} />
            </div>
          </Tab>
          <Tab title={translate('pdfUploadTitle')}>
            <PDFViewer
              width={500}
              height={1000}
              file="https://doorward.local:7000/uploads/doorward/of1eaHhoBMNx0YpaCnE0_1636018563167.pdf"
            />
            {pdfs.map((pdf) => (
              <div></div>
            ))}
            <FileUploadButton
              fileTypes={['application/pdf']}
              onNewFileUploaded={(file) => {
                setPdfs([...pdfs, file]);
              }}
              uploadHandler={DoorwardApi.api.files.uploadFile}
            />
          </Tab>
        </TabLayout>
      </div>
    </AddModuleItemForm>
  );
}

export interface AddModulePageFormState extends CreatePageBody {}

export interface AddModulePageFormProps<T = any> {
  useForm: UseForm<T>;
  module: ModuleEntity;
  onSuccess: () => void;
  onCancel: () => void;
  page?: PageEntity;
}

export default AddModulePageForm;
