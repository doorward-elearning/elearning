import React, { ReactElement, useContext } from 'react';
import { FeatureContext } from './index';
import IfElse from '../IfElse';

const Feature: React.FunctionComponent<FeatureProps> = ({ feature, children, excludeIfHas }): JSX.Element => {
  const { features } = useContext(FeatureContext);
  let show = features.includes(feature);
  if (excludeIfHas) {
    show = show && !features.find(x => x === excludeIfHas);
  }
  return <IfElse condition={show}>{children}</IfElse>;
};

export interface FeatureProps {
  children: ReactElement;
  feature: any;
  excludeIfHas?: any;
}

export default Feature;
