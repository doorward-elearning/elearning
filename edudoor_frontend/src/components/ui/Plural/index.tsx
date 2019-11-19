const Pluralize = require('react-pluralize').default;

import React, { FunctionComponent } from 'react';

const Plural: FunctionComponent<PluralProps> = (props): JSX.Element => {
  return <Pluralize {...props} />;
};

export interface PluralProps {
  singular: string;
  count: number;
}

export default Plural;
