import React, { useState } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { CreateVideoBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';
import AddModuleItemForm from '../AddModuleItemForm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import TextField from '@doorward/ui/components/Input/TextField';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';
import FileUploadField from '@doorward/ui/components/Input/FileUploadField';
import FieldGroup from '@doorward/ui/components/Input/FieldGroup';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import TextArea from '@doorward/ui/components/Input/TextArea';
import VideoPlayer from '@doorward/ui/components/VideoPlayer';
import Spacer from '@doorward/ui/components/Spacer';
import DoorwardApi from '../../../services/apis/doorward.api';

const AddModuleVideoForm: React.FunctionComponent<AddModuleVideoFormProps> = ({
  useForm,
  module,
  onSuccess,
  onCancel,
  video,
}): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(video?.videoURL ? 1 : 0);
  const initialValues: Partial<CreateVideoBody> = video || {
    title: translate('untitledVideo'),
    fileId: null,
  };

  return (
    <AddModuleItemForm
      onSuccess={onSuccess}
      module={module}
      type={ModuleItemType.VIDEO}
      key={video?.id}
      onCancel={onCancel}
      validationSchema={CreateVideoBody}
      item={video}
      initialValues={initialValues}
      form={useForm}
    >
      {(formikProps) => (
        <div className="ed-add-module-video-form">
          <TextField name="title" placeholder={translate('title')} />
          <FieldGroup name="video">
            {formikProps.values.videoURL && (
              <div>
                <VideoPlayer source={formikProps.values.videoURL} />
                <Spacer size="large" />
              </div>
            )}
            <TabLayout
              hiddenTabs={!!formikProps.values.fileId}
              selected={currentTab}
              onTabChange={setCurrentTab}
              controlled
            >
              <Tab title={translate('uploadVideo')}>
                <FileUploadField
                  placeholder={translate('video')}
                  name="fileId"
                  fileTypes={['video/*']}
                  uploadHandler={DoorwardApi.api.files.uploadFile}
                  onFileChanged={(file) => {
                    if (file) {
                      const title = formikProps.values.title;
                      if (title === translate('untitledVideo')) {
                        formikProps.setFieldValue('title', file.name, true);
                      }
                    }
                    if (currentTab === 0) {
                      formikProps.setFieldValue('videoURL', file?.publicUrl);
                    }
                  }}
                />
              </Tab>
              <Tab title={translate('videoURL')}>
                <TextField name="videoURL" placeholder={translate('videoURL')} editable={!formikProps.values.fileId} />
              </Tab>
            </TabLayout>
          </FieldGroup>
          <TextArea name="description" placeholder={translate('description')} />
        </div>
      )}
    </AddModuleItemForm>
  );
};

export interface AddModuleVideoFormProps {
  useForm: UseForm<CreateVideoBody>;
  module: ModuleEntity;
  onSuccess: () => void;
  onCancel: () => void;
  video?: ModuleVideoEntity;
}

export default AddModuleVideoForm;
