import React from 'react';

const PasswordPolicy: React.FunctionComponent<PasswordPolicyProps> = props => {
  return (
    <div>
      <p>A strong password will have: </p>
      <ul>
        <li>At least 8 characters - the more characters, the better</li>
        <li>A mixture of both uppercase and lowercase letters.</li>
        <li>A mixture of letters and numbers</li>
        <li>Inclusion of at least one special character, e.g. !@#?]</li>
      </ul>
    </div>
  );
};

export interface PasswordPolicyProps {}

export default PasswordPolicy;
