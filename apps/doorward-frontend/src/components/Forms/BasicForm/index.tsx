import React, { ReactChild, useCallback } from 'react';
import Form, { FormProps } from '@doorward/ui/components/Form';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import Row from '@doorward/ui/components/Row';
import Button from '@doorward/ui/components/Buttons/Button';
import FeatureProvider from '@doorward/ui/components/FeatureProvider';
import Feature from '@doorward/ui/components/FeatureProvider/Feature';
import './BasicForm.scss';
import { Omit } from '@doorward/common/types';
import { useHistory } from 'react-router';
import translate from '@doorward/common/lang/translate';
import { ApiActionCreator, UseApiAction, WebComponentState } from 'use-api-action/types/types';
import useRequestToast from '@doorward/ui/hooks/useRequestToast';
import { FormikProps } from 'formik';

export enum BasicFormFeatures {
  SAVE_BUTTON = 1,
  CANCEL_BUTTON = 2,
}

function BasicForm<T, A extends ApiActionCreator, W>(props: BasicFormProps<T, A, W>): JSX.Element {
  const { children } = props;
  const { showSuccessToast, showErrorToast } = props;

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const state = props.state || props.apiAction?.[1];

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const submit = props.submitAction || props.apiAction?.[0];

  const form = props.form;
  const features = props.features || [BasicFormFeatures.CANCEL_BUTTON, BasicFormFeatures.SAVE_BUTTON];
  const createData = props.createData || ((data) => [data]);

  const history = useHistory();

  useRequestToast(state, showSuccessToast, showErrorToast);

  const onSubmit = (body: T): void => {
    submit(...createData(body));
  };

  const onFormSubmit = useCallback(() => {
    if (props.resetOnSubmit && form.formikProps) {
      form.formikProps.resetForm();
    }
    if (!(state.errors?.message || state.errors?.errors) && props.onSuccess) {
      props.onSuccess(state.data);
    }
  }, [state]);

  useFormSubmit(state, onFormSubmit);

  return (
    <FeatureProvider features={features}>
      <Form
        {...props}
        state={state}
        onSubmit={onSubmit}
        hideFormMessage={showSuccessToast || showErrorToast || props.hideFormMessage}
      >
        {(formikProps) => {
          return (
            <React.Fragment>
              {(children as any).apply ? (children as any)(formikProps, state) : children}
              <Feature feature={[BasicFormFeatures.SAVE_BUTTON, BasicFormFeatures.CANCEL_BUTTON]}>
                <Row className="basic-form__submitArea">
                  <Feature feature={BasicFormFeatures.SAVE_BUTTON}>
                    <Button
                      theme="success"
                      type="submit"
                      disabled={!props.enableSubmitButton && (formikProps.isSubmitting || !formikProps?.isValid)}
                      loading={state.submitting}
                    >
                      {props.positiveText || translate('save')}
                    </Button>
                  </Feature>
                  <Feature feature={BasicFormFeatures.CANCEL_BUTTON}>
                    <Button
                      theme="secondary"
                      type="button"
                      disabled={state.submitting}
                      onClick={props.onCancel || history.goBack}
                    >
                      {props.negativeText || translate('cancel')}
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

export type BasicFormProps<Values, ActionCreator extends ApiActionCreator, WebState> = {
  children:
    | Array<ReactChild>
    | ReactChild
    | ((props: FormikProps<Values>, state: WebComponentState<WebState, WebState>) => React.ReactNode);
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
} & Omit<FormProps<Values>, 'onSubmit'> &
  (
    | { submitAction: ActionCreator; state: WebComponentState<WebState, WebState> }
    | { apiAction: UseApiAction<any, any, any, any, WebState> }
  );

export default BasicForm;
