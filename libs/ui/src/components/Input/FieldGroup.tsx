import React from 'react';
import withInput, { InputFeatures, InputProps } from '@doorward/ui/components/Input/index';

const FieldGroup: React.FunctionComponent<FieldGroupProps> = (props): JSX.Element => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export interface FieldGroupProps extends InputProps {}

export default withInput(FieldGroup, [InputFeatures.LABEL], { labelPosition: 'top', alwaysShowError: true });
