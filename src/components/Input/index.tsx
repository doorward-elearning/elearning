import React, { FunctionComponent } from 'react';

function withInput<R extends InputProps>(Input: FunctionComponent): FunctionComponent<R> {
  return (props): JSX.Element => {
    return (
      <>
        <Input {...props} />
      </>
    );
  };
}

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default withInput;
