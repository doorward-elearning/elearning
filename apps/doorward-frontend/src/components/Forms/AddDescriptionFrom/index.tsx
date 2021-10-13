import React from 'react';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateCourseBody, CreateDiscussionGroupBody, UpdateCourseBody } from '@doorward/common/dtos/body';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import TextField from '@doorward/ui/components/Input/TextField';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DraftTextArea from '@doorward/ui/components/Input/DraftTextArea';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import CourseEntity from '@doorward/common/entities/course.entity';

const AddDescriptionForm: React.FunctionComponent<AddDescriptionFormProps> = (props): JSX.Element => {
  const initialValues = {
    title: '',
    description: '',
  };

  const [updateCourse, updateCourseState] = useApiAction(DoorwardApi, (api) => api.courses.updateCourse);

  return (
    <BasicForm
      initialValues={initialValues}
      submitAction={updateCourse}
      state={updateCourseState}
      onSuccess={props.onSuccess}
      showSuccessToast
      showErrorToast
      form={props.form}
      validationSchema={UpdateCourseBody}
      features={[BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON]}
      createData={(values) => [props.course.id, values]}
    >
      <TextField name="title" label={translate('title')} />
      <DraftTextArea fluid name="description" label={translate('description')} labelPosition="top" />
    </BasicForm>
  );
};

export interface AddDescriptionFormProps {
  course: CourseEntity;
  onSuccess: () => void;
  form: UseForm<UpdateCourseBody>;
}

export default AddDescriptionForm;
