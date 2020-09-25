import React from 'react';
import Card from '@doorward/ui/components/Card';
import Row from '@doorward/ui/components/Row';
import TextField from '@doorward/ui/components/Input/TextField';
import DropdownSelect from '@doorward/ui/components/Input/DropdownSelect';
import { getNames } from 'country-list';
import BasicForm from '../BasicForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import PasswordField from '@doorward/ui/components/Input/PasswordField';
import IfElse from '@doorward/ui/components/IfElse';
import Header from '@doorward/ui/components/Header';
import PasswordPolicy from '../../UI/PasswordPolicy';
import Grid from '@doorward/ui/components/Grid';
import { CreateUserBody } from '@doorward/common/dtos/body';

const AddUserFormLayout: React.FunctionComponent<AddUserFormLayoutProps> = (props) => {
  const countries = getNames();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    city: '',
    country: '',
    password: '',
  };
  return (
    <BasicForm
      form={props.useForm}
      initialValues={initialValues}
      validationSchema={CreateUserBody}
      formClassName="add-student-form"
      showOverlay
      onCancel={props.onCancel}
      submitAction={props.action}
      onSuccess={props.onSuccess}
      createData={(data) => (props.createData ? props.createData(data) : [data])}
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
      <IfElse condition={props.withPasswordField}>
        <div>
          <Header size={2} style={{ marginTop: 'var(--padding-lg)', marginBottom: 'var(--padding-lg)' }}>
            Login Credentials
          </Header>
          <Card flat>
            <Card.Body>
              <Grid columns={2}>
                <PasswordField name="password" label="Password" icon="lock" showPassword showGenerator />
                <PasswordPolicy />
              </Grid>
            </Card.Body>
          </Card>
        </div>
      </IfElse>
    </BasicForm>
  );
};

export interface AddUserFormLayoutProps {
  useForm: UseForm<any>;
  state: WebComponentState<any>;
  onCancel: () => void;
  action: ActionCreator;
  onSuccess?: () => void;
  createData?: (data: any) => Array<any>;
  withPasswordField?: boolean;
}

export default AddUserFormLayout;
