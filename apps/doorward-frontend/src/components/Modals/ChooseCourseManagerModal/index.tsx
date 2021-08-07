import React from 'react';
import useForm from '@doorward/ui/hooks/useForm';
import { ChooseStudentFormState } from '../../Forms/ChooseStudentForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import ChooseCourseManagerForm from '../../Forms/ChooseCourseManagerForm';
import { TeachersResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../../services/apis/doorward.api';
import { WebComponentState } from '@doorward/api-actions/types';

const ChooseCourseManagerModal: React.FunctionComponent<ChooseCourseManagerModalProps> = (props): JSX.Element => {
  const form = useForm<ChooseStudentFormState>();
  const [, state] = useApiAction(DoorwardApi, (api) => api.courseManagers.createCourseManager);
  return (
    <Modal {...props} >
      <Modal.Header title={translate('addCourseManager')} />
      <Modal.Body>
        <ChooseCourseManagerForm
          form={form}
          managers={props.managers}
          courseId={props.courseId}
          onSuccess={props.onSuccess}
        />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: translate('save') }}
        props={{
          positive: {
            loading: state.submitting,
          },
        }}
        onPositiveClick={() => {
          form.formikProps.submitForm();
        }}
      />
    </Modal>
  );
};

export interface ChooseCourseManagerModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
  managers: WebComponentState<TeachersResponse, TeachersResponse>;
}

export default ChooseCourseManagerModal;
