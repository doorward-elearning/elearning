import React, { useState } from 'react';
import ChooseStudentForm, { ChooseStudentFormState, ChooseStudentGroupFormState } from '../../Forms/ChooseStudentForm';
import useForm from '@doorward/ui/hooks/useForm';
import Modal, { ModalProps } from '@doorward/ui/components/Modal';
import { NavBarSearchContext } from '@doorward/ui/components/NavBar/NavBarSearch';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import translate from '@doorward/common/lang/translate';

const ChooseStudentModal: React.FunctionComponent<ChooseStudentModalProps> = (props) => {
  const [selected, setSelected] = useState(0);
  const form = useForm<ChooseStudentFormState>();
  const groupForm = useForm<ChooseStudentGroupFormState>();
  const state = useDoorwardApi((state) => state.students.addStudentToCourse);
  const [searchText, setSearchText] = useState('');

  return (
    <NavBarSearchContext searchText={searchText}>
      <Modal {...props}>
        <Modal.Header title={translate.addStudentToCourse()} onSearch={setSearchText} />
        <Modal.Body>
          <ChooseStudentForm
            onTabChange={setSelected}
            form={form}
            courseId={props.courseId}
            search={searchText}
            onClearSearch={() => setSearchText('')}
            onSuccess={props.onSuccess}
            groupForm={groupForm}
          />
        </Modal.Body>
        <Modal.Footer
          buttons={{ positive: translate.save() }}
          props={{
            positive: {
              loading: state.submitting,
            },
          }}
          onPositiveClick={() => {
            if (selected === 0 && form.formikProps) {
              form.formikProps.submitForm();
            } else if (selected === 1 && groupForm.formikProps) {
              groupForm.formikProps.submitForm();
            }
          }}
        />
      </Modal>
    </NavBarSearchContext>
  );
};

export interface ChooseStudentModalProps extends ModalProps {
  courseId: string;
  onSuccess: () => void;
}

export default ChooseStudentModal;
