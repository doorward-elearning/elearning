import React from 'react';
import { FormikActions } from 'formik';
import { AddForumFormState } from '../../components/Forms/AddForumForm';
import { MemoryHistory } from 'history';
import { createForumAction } from '../../reducers/forums/actions';
import AddForumModal from '../../components/Modals/AddForumModal';
import useAction from '@doorward/ui/hooks/useActions';
import { ModalFeatures, ModalProps } from '@doorward/ui/components/Modal';

const AddForum: React.FunctionComponent<AddForumProps> = props => {
  const createForum = useAction(createForumAction);

  const onSubmit = (
    values: AddForumFormState,
    actions: FormikActions<AddForumFormState>
  ): void => {
    createForum(values, () => {
      props.useModal.closeModal();
    });
  };
  return (
    <AddForumModal
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

export interface AddForumProps extends ModalProps {
  title: string;
  history: MemoryHistory;
}

export default AddForum;
