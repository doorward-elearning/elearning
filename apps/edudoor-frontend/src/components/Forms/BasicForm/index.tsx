import React, { ReactChild } from 'react';
import Form, { FormProps, FormRenderProps } from '@edudoor/ui/components/Form';
import { Action, WebComponentState } from '@edudoor/ui/reducers/reducers';
import useAction from '@edudoor/ui/hooks/useActions';
import useFormSubmit from '@edudoor/ui/hooks/useFormSubmit';
import Row from '@edudoor/ui/components/Row';
import Button from '@edudoor/ui/components/Buttons/Button';
import FeatureProvider from '@edudoor/ui/components/FeatureProvider';
import Feature from '@edudoor/ui/components/FeatureProvider/Feature';
import './BasicForm.scss';
import { Omit } from '@edudoor/ui/types';

export enum BasicFormFeatures {
  SAVE_BUTTON = 1,
  CANCEL_BUTTON = 2,
}

const BasicForm = <T, A extends (...args: any[]) => Action>(
  props: Omit<BasicFormProps<T, A>, 'onSubmit'>
): JSX.Element => {
  const { children } = props;
  const { showSuccessToast, showErrorToast } = props;
  const submit = useAction(props.submitAction, {
    showSuccessToast,
    showErrorToast,
  });

  const form = props.form;
  const state = props.state;
  const features = props.features || [BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON];
  const createData = props.createData || (data => [data]);

  const onSubmit = (body: T): void => {
    submit(...createData(body));
  };

  useFormSubmit(props.state, () => {
    if (props.resetOnSubmit && form.formikProps) {
      form.formikProps.resetForm();
    }
    if (!(props.state.errors?.message || props.state.errors?.errors)) {
      props.onSuccess && props.onSuccess();
    }
  });

  return (
    <FeatureProvider features={features}>
      <Form {...props} onSubmit={onSubmit}>
        {formikProps => {
          return (
            <React.Fragment>
              {(children as FormRenderProps<any>).apply ? (children as FormRenderProps<any>)(formikProps) : children}
              <Feature feature={[BasicFormFeatures.SAVE_BUTTON, BasicFormFeatures.CANCEL_BUTTON]}>
                <Row className="basic-form__submitArea">
                  <Feature feature={BasicFormFeatures.SAVE_BUTTON}>
                    <Button
                      theme="success"
                      type="submit"
                      disabled={!props.enableSubmitButton && (formikProps.isSubmitting || !formikProps?.isValid)}
                      loading={state.submitting}
                    >
                      {props.positiveText || 'Save'}
                    </Button>
                  </Feature>
                  <Feature feature={BasicFormFeatures.CANCEL_BUTTON}>
                    <Button theme="secondary" type="button" disabled={state.submitting} onClick={props.onCancel}>
                      {props.negativeText || 'Cancel'}
                    </Button>
                  </Feature>
                </Row>
              </Feature>
            </React.Fragment>
          );
        }}
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
  positiveText?: string;
  negativeText?: string;
  showOverlay?: boolean;
  children: Array<ReactChild> | ReactChild | FormRenderProps<T>;
  enableSubmitButton?: boolean;
}

export default BasicForm;
