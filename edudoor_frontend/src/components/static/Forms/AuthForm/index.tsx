import React, { ReactChild, ReactChildren, useContext } from 'react';
import EImage from '../../../ui/Image';
import './AuthForm.scss';
import Button from '../../../ui/Buttons/Button';
import Header from '../../../ui/Header';
import Card from '../../../ui/Card';
import IfElse from '../../../ui/IfElse';
import ProgressBar from '../../../ui/ProgressBar';
import { ThemeContext } from '../../../ui/ApplicationTheme';
import BasicForm, { BasicFormProps } from '../BasicForm';
import { Action } from '../../../../reducers/reducers';

function AuthForm<T, R extends (...args: any[]) => Action>(props: AuthFormProps<T, R>) {
  const { theme } = useContext(ThemeContext);
  const { form, buttonText } = props;

  return (
    <Card>
      <Card.Header image />
      <Card.Body>
        <div className="login-form__header">
          <EImage alt="" src={theme.logo} circle size="xLarge" />
          <Header size={1}>{props.title}</Header>
          <IfElse condition={props.message}>
            <p>{props.message}</p>
          </IfElse>
        </div>
        <BasicForm formClassName="login-form" features={[]} {...props}>
          {props.children}
          <div className="login-form__footer">
            <Button loading={form.formikProps?.isSubmitting}>{buttonText}</Button>
            {props.renderFooter && props.renderFooter()}
          </div>
        </BasicForm>
      </Card.Body>
    </Card>
  );
}
export interface AuthFormProps<T, R extends (...args: any[]) => Action> extends Omit<BasicFormProps<T, R>, 'onSubmit'> {
  renderFooter?: () => JSX.Element;
  title: string;
  children: ReactChild | ReactChildren;
  buttonText: string;
  message?: string;
}
export default AuthForm;
