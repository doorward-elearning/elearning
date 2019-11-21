import React from 'react';
import Form, { FormProps } from '../../../ui/Form';
import { Action, WebComponentState } from '../../../../reducers/reducers';
import useAction from '../../../../hooks/useActions';
import useFormSubmit from '../../../../hooks/useFormSubmit';
import useForm from '../../../../hooks/useForm';
import Row from '../../../ui/Row';
import Button from '../../../ui/Buttons/Button';
import FeatureProvider from '../../../ui/FeatureProvider';
import Feature from '../../../ui/FeatureProvider/Feature';
import './BasicForm.scss';

export enum BasicFormFeatures {
  SAVE_BUTTON = 1,
  CANCEL_BUTTON = 2,
}

const BasicForm = <T, A extends (...args: any[]) => Action>(
  props: Omit<BasicFormProps<T, A>, 'onSubmit'>
): JSX.Element => {
  const { showSuccessToast, showErrorToast } = props;
  const submit = useAction(props.submitAction, {
    showSuccessToast,
    showErrorToast,
  });

  const form = props.form || useForm();
  const state = props.state;
  const features = props.features || [BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON];
  const createData = props.createData || (data => [data]);

  const onSubmit = (body: T): void => {
    submit(...createData(body));
  };

  useFormSubmit(props.state, () => {
    if (props.resetOnSubmit) {
      form.formikProps?.resetForm();
    }
    props.onSuccess && props.onSuccess();
  });

  return (
    <FeatureProvider features={features}>
      <Form showOverlay {...props} onSubmit={onSubmit}>
        {props.children}
        <Row className="basic-form__submitArea">
          <Feature feature={BasicFormFeatures.SAVE_BUTTON}>
            <Button
              theme="success"
              type="submit"
              disabled={state.submitting || !props.form.formikProps?.isValid}
              loading={state.submitting}
            >
              Save
            </Button>
          </Feature>
          <Feature feature={BasicFormFeatures.CANCEL_BUTTON}>
            <Button theme="secondary" type="button" disabled={state.submitting} onClick={props.onCancel}>
              Cancel
            </Button>
          </Feature>
        </Row>
      </Form>
    </FeatureProvider>
  );
};

export interface BasicFormProps<T, A extends (...args: any[]) => Action> extends FormProps<T> {
  submitAction: A;
  createData?: (values: T) => any;
  resetOnSubmit?: boolean;
  onSuccess?: () => void;
  state: WebComponentState<any>;
  onCancel?: () => void;
  features?: Array<BasicFormFeatures>;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export default BasicForm;
