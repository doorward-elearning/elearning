import React, { MouseEventHandler } from 'react';
import Form from '../../../ui/Form';
import { UseForm } from '../../../../hooks/useForm';
import TextField from '../../../ui/Input/TextField';
import Button from '../../../ui/Buttons/Button';
import Row from '../../../ui/Row';
import Card from '../../../ui/Card';
import { OnFormSubmit } from '../../../../types';
import { getNames } from 'country-list';
import DropdownSelect from '../../../ui/Input/DropdownSelect';
import addStudentForm from './validation';
import { CreateStudentBody } from '../../../../services/models/requestBody';
import { WebComponentState } from '../../../../reducers/reducers';
import { StudentResponse } from '../../../../services/models/responseBody';

const AddStudentForm: React.FunctionComponent<AddStudentFormProps> = props => {
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
    <Form
      form={props.useForm}
      initialValues={initialValues}
      validationSchema={addStudentForm}
      formClassName="add-student-form"
      showOverlay
      onSubmit={props.onSubmit}
      state={props.state}
    >
      {(formikProps): JSX.Element => {
        return (
          <Card flat>
            <Card.Body>
              <Row style={{ gridAutoFlow: 'row', gridTemplateColumns: '1fr 1fr', gridColumnGap: 'var(--padding-lg)' }}>
                <TextField name="firstName" label="First Name" icon="account_circle" />
                <TextField name="lastName" label="Last Name" icon="account_box" />
                <TextField name="email" type="email" label="Email" icon="email" />
                <TextField name="username" label="Username" icon="account_circle" />
                <TextField name="city" label="City" icon="business" />
                <DropdownSelect options={countries} name="country" label="Country" icon="my_location" />
                <Row
                  className="add-student-form__buttons"
                  style={{ gridGap: 'var(--padding-lg)', justifyContent: 'start' }}
                >
                  <Button type="submit" disabled={!formikProps.isValid || formikProps.isSubmitting}>
                    Save
                  </Button>
                  <Button theme="default" type="reset" onClick={props.onCancel}>
                    Cancel
                  </Button>
                </Row>
              </Row>
            </Card.Body>
          </Card>
        );
      }}
    </Form>
  );
};

export interface AddStudentFormState extends CreateStudentBody {}
export interface AddStudentFormProps {
  useForm: UseForm<AddStudentFormState>;
  onSubmit: OnFormSubmit<AddStudentFormState>;
  state: WebComponentState<StudentResponse>;
  onCancel: MouseEventHandler;
}

export default AddStudentForm;
