import React, { ReactElement, useContext } from 'react';
import { FeatureContext } from './index';

const Feature: React.FunctionComponent<FeatureProps> = ({ feature, children, excludeIfHas }): JSX.Element => {
  const { features } = useContext(FeatureContext);
  let show = features.includes(feature);
  if (excludeIfHas) {
    show = show && !features.find(x => x === excludeIfHas);
  }
  return <React.Fragment>{show && children}</React.Fragment>;
};

export interface FeatureProps {
  children: ReactElement;
  feature: any;
  excludeIfHas?: any;
}

export default Feature;
