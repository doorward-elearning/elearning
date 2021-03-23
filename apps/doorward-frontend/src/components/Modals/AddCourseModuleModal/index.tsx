import React from 'react';
import AddModuleForm, { AddModuleFormState } from '../../Forms/AddModuleForm';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import translate from '@doorward/common/lang/translate';

const AddCourseModuleModal: React.FunctionComponent<AddCourseModuleModalProps> = (props) => {
  const form = useForm<AddModuleFormState>();
  const { formikProps } = form;

  props.useModal.onClose(() => {
    formikProps && formikProps.resetForm();
  });

  return (
    <Modal {...props}>
      <Modal.Header title={translate('addCourseModule')} />
      <Modal.Body>
        <AddModuleForm
          courseId={props.courseId}
          useForm={form}
          onSuccess={() => {
            props.useModal.closeModal();
            props.onSuccess();
          }}
        />
      </Modal.Body>
      <Modal.Footer
        buttons={{ positive: translate('save') }}
        props={{
          positive: { disabled: !formikProps?.isValid },
        }}
        onPositiveClick={formikProps && formikProps.submitForm}
      />
    </Modal>
  );
};

export interface AddCourseModuleModalProps extends ModalProps {
  courseId: string;
  useModal: UseModal;
  onSuccess?: () => void;
}

export default AddCourseModuleModal;
