import React, { ReactChild, useEffect, useState } from 'react';
import EImage from '@edudoor/ui/components/Image';
import './AuthForm.scss';
import Button from '@edudoor/ui/components/Buttons/Button';
import Header from '@edudoor/ui/components/Header';
import Card from '@edudoor/ui/components/Card';
import IfElse from '@edudoor/ui/components/IfElse';
import BasicForm, { BasicFormProps } from '../BasicForm';
import { Action } from '@edudoor/ui/reducers/reducers';
import { Omit } from '@edudoor/ui/types';
import useOrganization from '../../../hooks/useOrganization';
import useApp from '../../../hooks/useApp';
import useTheme from '../../../hooks/useTheme';
import themes from '@edudoor/ui/themes/themes';

function AuthForm<T, R extends (...args: any[]) => Action>(props: AuthFormProps<T, R>) {
  const organization = useOrganization();
  const theme = useTheme();
  const { buttonText } = props;
  const [icon, setIcon] = useState(organization.icon);

  useEffect(() => {
    if (theme.theme === themes.dark) {
      setIcon(organization.darkThemeIcon || organization.icon);
    } else {
      setIcon(organization.icon);
    }
  }, [theme.theme]);

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
