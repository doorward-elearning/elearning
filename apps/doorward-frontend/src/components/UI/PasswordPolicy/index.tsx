import React from 'react';
import translate from '@doorward/common/lang/translate';

const PasswordPolicy: React.FunctionComponent<PasswordPolicyProps> = (props) => {
  return (
    <div>
      <p>{translate('passwordPolicyTitle')}</p>
      <ul>
        <li>{translate('passwordPolicyRule1')}</li>
        <li>{translate('passwordPolicyRule2')}</li>
        <li>{translate('passwordPolicyRule3')}</li>
        <li>{translate('passwordPolicyRule4')}</li>
      </ul>
    </div>
  );
};

export interface PasswordPolicyProps {}

export default PasswordPolicy;
