import React, { FunctionComponent } from 'react';
import { InputProps } from '../../types';


function withInput<R extends InputProps> (Input: FunctionComponent ): FunctionComponent<R>{
  return (props): JSX.Element => {
    return (
      <>
        <Input {...props}/>
      </>
    );
  };
}


export default withInput;
