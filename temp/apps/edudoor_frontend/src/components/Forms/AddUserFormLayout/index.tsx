import React from 'react';
import Card from '@edudoor/ui/src/components/Card';
import Row from '@edudoor/ui/src/components/Row';
import TextField from '@edudoor/ui/src/components/Input/TextField';
import DropdownSelect from '@edudoor/ui/src/components/Input/DropdownSelect';
import { getNames } from 'country-list';
import BasicForm from '../BasicForm';
import addStudentForm from '../AddStudentForm/validation';
import { UseForm } from '@edudoor/ui/src/hooks/useForm';
import { ActionCreator, WebComponentState } from '@edudoor/ui/src/reducers/reducers';

const AddUserFormLayout: React.FunctionComponent<AddUserFormLayoutProps> = props => {
  const countries = getNames();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    city: '',
    country: '',
  };
  return (
    <BasicForm
      form={props.useForm}
      initialValues={initialValues}
      validationSchema={addStudentForm}
      formClassName="add-student-form"
      showOverlay
      onCancel={props.onCancel}
      submitAction={props.action}
      createData={data => (props.createData ? props.createData(data) : [data])}
      state={props.state}
    >
      <Card flat>
        <Card.Body>
          <Row style={{ gridAutoFlow: 'row', gridTemplateColumns: '1fr 1fr', gridColumnGap: 'var(--padding-lg)' }}>
            <TextField name="firstName" label="First Name" icon="account_circle" />
            <TextField name="lastName" label="Last Name" icon="account_box" />
            <TextField name="email" type="email" label="Email" icon="email" />
            <TextField name="username" label="Username" icon="account_circle" />
            <TextField name="city" label="City" icon="business" />
            <DropdownSelect options={countries} name="country" label="Country" icon="my_location" />
          </Row>
        </Card.Body>
      </Card>
    </BasicForm>
  );
};

export interface AddUserFormLayoutProps {
  useForm: UseForm<any>;
  state: WebComponentState<any>;
  onCancel: () => void;
  action: ActionCreator;
  createData?: (data: any) => Array<any>;
}

export default AddUserFormLayout;
