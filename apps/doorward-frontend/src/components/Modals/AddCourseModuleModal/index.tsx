import React from 'react';
import AddModuleForm, { AddModuleFormState } from '../../Forms/AddModuleForm';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../../../services/apis/doorward.api';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';

const AddCourseModuleModal: React.FunctionComponent<AddCourseModuleModalProps> = (props) => {
  const form = useForm<AddModuleFormState>();
  const { formikProps } = form;

  const apiAction = useApiAction(DoorwardApi, (api) => api.courses.createCourseModule);

  useFormSubmit(apiAction[1], props.useModal.closeModal);

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
  });
  return (
    <Modal {...props}>
      <Modal.Header title={translate('addCourseModule')} />
      <Modal.Body>
        <AddModuleForm courseId={props.courseId} useForm={form} />
      </Modal.Body>
      <Modal.Footer buttons={{ positive: translate('save') }} onPositiveClick={formikProps && formikProps.submitForm} />
    </Modal>
  );
};

export interface AddCourseModuleModalProps extends ModalProps {
  courseId: string;
  useModal: UseModal;
}

export default AddCourseModuleModal;
