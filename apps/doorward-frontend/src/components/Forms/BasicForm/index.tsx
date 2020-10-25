import React, { ReactChild } from 'react';
import Form, { FormProps, FormRenderProps } from '@doorward/ui/components/Form';
import { Action, WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import Row from '@doorward/ui/components/Row';
import Button from '@doorward/ui/components/Buttons/Button';
import FeatureProvider from '@doorward/ui/components/FeatureProvider';
import Feature from '@doorward/ui/components/FeatureProvider/Feature';
import './BasicForm.scss';
import { Omit } from '@doorward/common/types';
import { useHistory } from 'react-router';
import translate from '@doorward/common/lang/translate';

export enum BasicFormFeatures {
  SAVE_BUTTON = 1,
  CANCEL_BUTTON = 2,
}

function BasicForm<T, A extends (...args: any[]) => Action, W>(
  props: Omit<BasicFormProps<T, A, W>, 'onSubmit'>
): JSX.Element {
  const { children } = props;
  const { showSuccessToast, showErrorToast } = props;
  const submit = useAction(props.submitAction, {
    showSuccessToast,
    showErrorToast,
  });

  const form = props.form;
  const state = props.state;
  const features = props.features || [BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON];
  const createData = props.createData || ((data) => [data]);

  const history = useHistory();

  const onSubmit = (body: T): void => {
    submit(...createData(body));
  };

  useFormSubmit(props.state, () => {
    if (props.resetOnSubmit && form.formikProps) {
      form.formikProps.resetForm();
    }
    if (!(props.state.errors?.message || props.state.errors?.errors) && props.onSuccess) {
      props.onSuccess(props.state.data);
    }
  });

  return (
    <FeatureProvider features={features}>
      <Form {...props} onSubmit={onSubmit}>
        {(formikProps) => {
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
                      {props.positiveText || translate.save()}
                    </Button>
                  </Feature>
                  <Feature feature={BasicFormFeatures.CANCEL_BUTTON}>
                    <Button
                      theme="secondary"
                      type="button"
                      disabled={state.submitting}
                      onClick={props.onCancel || history.goBack}
                    >
                      {props.negativeText || translate.back()}
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
}

export type CreateData<T, ReturnValue = any> = (values: T) => ReturnValue;

export interface BasicFormProps<Values, ActionCreator extends (...args: any[]) => Action, WebState = any>
  extends FormProps<Values> {
  submitAction: ActionCreator;
  state: WebComponentState<WebState>;
  children: Array<ReactChild> | ReactChild | FormRenderProps<Values>;
  onCancel?: () => void;
  features?: Array<BasicFormFeatures>;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  positiveText?: string;
  negativeText?: string;
  showOverlay?: boolean;
  createData?: CreateData<Values>;
  resetOnSubmit?: boolean;
  onSuccess?: (result?: WebState) => void;
  enableSubmitButton?: boolean;
}

export default BasicForm;
