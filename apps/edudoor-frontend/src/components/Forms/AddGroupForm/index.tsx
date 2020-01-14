import React from 'react';
import TextField from '@edudoor/ui/components/Input/TextField';
import countries from 'country-list';
import DropdownSelect from '@edudoor/ui/components/Input/DropdownSelect';
import Form from '@edudoor/ui/components/Form';
import useForm from '@edudoor/ui/hooks/useForm';

const AddGroupForm: React.FunctionComponent<AddGroupFormProps> = (props): JSX.Element => {
  const form = useForm();
  return (
    <div>
      <Form form={form} initialValues={{}} onSubmit={() => {}}>
        <TextField name="name" placeholder="Name" />
        <DropdownSelect options={countries.getNames()} name="members" multi />
      </Form>
    </div>
  );
};

export interface AddGroupFormProps {}

export default AddGroupForm;
