import React from 'react';
import { FormikActions } from 'formik';
import { AddConferenceFormState } from '../../components/Forms/AddConferenceForm';
import { MemoryHistory } from 'history';
import { createConferenceAction } from '../../reducers/conferences/actions';
import AddConferenceModal from '../../components/Modals/AddConferenceModal';
import useAction from '@doorward/ui/hooks/useActions';
import { ModalFeatures, ModalProps } from '@doorward/ui/components/Modal';

const AddConference: React.FunctionComponent<AddConferenceProps> = props => {
  const createConference = useAction(createConferenceAction);

  const onSubmit = (
    values: AddConferenceFormState,
    actions: FormikActions<AddConferenceFormState>
  ): void => {
    createConference(values, () => {
      props.useModal.closeModal();
    });
  };
  return (
    <AddConferenceModal
      useModal={props.useModal}
      features={[
        ModalFeatures.POSITIVE_BUTTON,
        ModalFeatures.CLOSE_BUTTON_FOOTER
      ]}
      onSubmit={onSubmit}
      title={props.title}
    />
  );
};

export interface AddConferenceProps extends ModalProps {
  title: string;
  history: MemoryHistory;
}

export default AddConference;
