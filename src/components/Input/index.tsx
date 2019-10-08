import React, { FunctionComponent } from 'react';
import { InputProps } from '../../types';

const Input: FunctionComponent<InputProps> = (props): JSX.Element => {
  return (
    <>
      <input {...props} />
    </>
  );
};

export default Input;
