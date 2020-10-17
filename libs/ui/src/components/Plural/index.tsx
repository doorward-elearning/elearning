import React, { FunctionComponent } from 'react';
const Pluralize = require('react-pluralize').default;

const Plural: FunctionComponent<PluralProps> = (props): JSX.Element => {
  return <Pluralize {...props} count={props.count || 0} />;
};

export interface PluralProps {
  singular: string;
  count: number;
}

export default Plural;
