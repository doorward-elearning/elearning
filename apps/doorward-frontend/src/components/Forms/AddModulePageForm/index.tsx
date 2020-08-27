import React from 'react';
import useForm, { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import './AddModulePageForm.scss';
import TextField from '@doorward/ui/components/Input/TextField';
import validation from './validation';
import AddModuleItemForm from '../AddModuleItemForm';
import { CourseModuleItemBody } from '../../../services/models/requestBody';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import Button from '@doorward/ui/components/Buttons/Button';
import useModal from '@doorward/ui/hooks/useModal';
import AddYoutubeVideoForm, { AddYoutubeVideoFormState } from './AddYoutubeVideoForm';
import YouTubePrivateVideo from '../../YouTubePrivateVideo';
import Panel from '@doorward/ui/components/Panel';

function AddModulePageForm<T extends AddModulePageFormState>({
  useForm: form,
  module,
  onSuccess,
  page,
  onCancel,
}: AddModulePageFormProps<T>) {
  const initialValues: any = {
    title: page?.title || 'Untitled Page',
    content: page?.content?.video ? page.content.content : page?.content ? page.content : null,
    video: page?.content?.video || '',
  };
  const addYoutubeVideoModal = useModal();
  const addYoutubeVideoForm = useForm<AddYoutubeVideoFormState>();
  return (
    <div>
      <AddModuleItemForm
        onSuccess={onSuccess}
        item={module}
        type="Page"
        key={page?.id}
        onCancel={onCancel}
        validationSchema={validation}
        initialValues={initialValues}
        form={form}
      >
        {(formikProps) => {
          const hasVideo = !!formikProps.values.video;
          return (
            <div>
              <AddYoutubeVideoForm
                addYoutubeVideoModal={addYoutubeVideoModal}
                form={addYoutubeVideoForm}
                onSubmit={(video) => {
                  formikProps.setFieldValue('video', video);
                }}
              />
              <div className="add-module-page">
                <TextField name="title" placeholder="Title of the page" />
                {!hasVideo ? (
                  <div>
                    <Button
                      icon="ondemand_video"
                      mini
                      className="youtube-button"
                      onClick={addYoutubeVideoModal.openModal}
                    >
                      Add YouTube Video
                    </Button>
                  </div>
                ) : (
                  <Panel style={{ justifySelf: 'stretch' }}>
                    <YouTubePrivateVideo link={formikProps.values.video} />
                    <Button icon="close" mini onClick={() => formikProps.setFieldValue('video', '')}>
                      Remove Video
                    </Button>
                  </Panel>
                )}
                <DraftTextArea name="content" placeholder="Empty space is boring... Add some content for the page." />
              </div>
            </div>
          );
        }}
      </AddModuleItemForm>
    </div>
  );
}

export interface AddModulePageFormState extends CourseModuleItemBody {
  video: string;
}

export interface AddModulePageFormProps<T = any> {
  useForm: UseForm<T>;
  module: Module;
  onSuccess: () => void;
  onCancel: () => void;
  page?: ModuleItem;
}

export default AddModulePageForm;
