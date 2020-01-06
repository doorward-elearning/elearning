import React, { ReactChild, useContext } from 'react';
import EImage from '@edudoor/ui/components/Image';
import './AuthForm.scss';
import Button from '@edudoor/ui/components/Buttons/Button';
import Header from '@edudoor/ui/components/Header';
import Card from '@edudoor/ui/components/Card';
import IfElse from '@edudoor/ui/components/IfElse';
import { ThemeContext } from '@edudoor/ui/components/ApplicationTheme';
import BasicForm, { BasicFormProps } from '../BasicForm';
import { Action } from '@edudoor/ui/reducers/reducers';

function AuthForm<T, R extends (...args: any[]) => Action>(props: AuthFormProps<T, R>) {
  const { theme } = useContext(ThemeContext);
  const { buttonText } = props;

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