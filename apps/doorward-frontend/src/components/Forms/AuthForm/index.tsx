import React, { ReactChild } from 'react';
import EImage from '@doorward/ui/components/Image';
import './AuthForm.scss';
import Button from '@doorward/ui/components/Buttons/Button';
import Header from '@doorward/ui/components/Header';
import Card from '@doorward/ui/components/Card';
import IfElse from '@doorward/ui/components/IfElse';
import BasicForm, { BasicFormProps } from '../BasicForm';
import { Action } from '@doorward/ui/reducers/reducers';
import { Omit } from '@doorward/common/types';
import useLogo from '../../../hooks/useLogo';

function AuthForm<T, R extends (...args: any[]) => Action>(props: AuthFormProps<T, R>) {
  const { buttonText } = props;
  const icon = useLogo();

  return (
    <Card>
      <Card.Header image />
      <Card.Body>
        <div className="login-form__header">
          <EImage alt="" src={icon} circle size="xLarge" />
          <Header size={1}>{props.title}</Header>
          <IfElse condition={props.message}>
            <p>{props.message}</p>
          </IfElse>
        </div>
        <div className="login-form">
          <BasicForm features={[]} {...props}>
            {formikProps => (
              <React.Fragment>
                {props.children}
                <div className="login-form__footer">
                  <Button loading={formikProps.isSubmitting}>{buttonText}</Button>
                  {props.renderFooter && props.renderFooter()}
                </div>
              </React.Fragment>
            )}
          </BasicForm>
        </div>
      </Card.Body>
    </Card>
  );
}
export interface AuthFormProps<T, R extends (...args: any[]) => Action> extends Omit<BasicFormProps<T, R>, 'onSubmit'> {
  renderFooter?: () => JSX.Element;
  title: string;
  children: ReactChild | Array<ReactChild>;
  buttonText: string;
  message?: string;
}
export default AuthForm;