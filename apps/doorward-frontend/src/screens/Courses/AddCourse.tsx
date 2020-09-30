import React from 'react';
import { MemoryHistory } from 'history';
import AddCourseModal from '../../components/Modals/AddCourseModal';
import { ModalFeatures, ModalProps } from '@doorward/ui/components/Modal';

const AddCourse: React.FunctionComponent<AddCourseProps> = (props) => {
  return (
    <AddCourseModal
      useModal={props.useModal}
      features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
      onSuccess={props.useModal.closeModal}
      title={props.title}
    />
  );
};

export interface AddCourseProps extends ModalProps {
  title: string;
  history: MemoryHistory;
}

export default AddCourse;
