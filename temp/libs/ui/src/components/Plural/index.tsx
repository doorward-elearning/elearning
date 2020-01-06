import React, { FunctionComponent } from 'react';
const Pluralize = require('react-pluralize').default;

const Plural: FunctionComponent<PluralProps> = (props): JSX.Element => {
  return <Pluralize {...props} />;
};

export interface PluralProps {
  singular: string;
  count: number;
}

export default Plural;
