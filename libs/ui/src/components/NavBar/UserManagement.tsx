import React from 'react';
import './UserManagement.scss';
import Button from '../Buttons/Button';
import Condition from '../IfElse';
import translate from '@doorward/common/lang/translate';

const UserManagement: React.FunctionComponent<UserManagementProps> = (props) => {
  return (
    <div className="user-management">
      <Condition condition={props.authenticated}>
        <React.Fragment>{props.children}</React.Fragment>
        <Button link={props.loginLink} theme="secondary">
          {translate('login')}
        </Button>
      </Condition>
    </div>
  );
};

export interface UserManagementProps {
  loginLink: string;
  authenticated: boolean;
}

export default UserManagement;
