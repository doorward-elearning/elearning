import React from 'react';
import SideNavigation from '../../components/SideNavigation';
import PricingHeader from './PricingHeader';
import Plans from './Plans';

const Pricing: React.FunctionComponent<PricingProps> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <SideNavigation />
      <PricingHeader />
      <Plans />
    </React.Fragment>
  );
};

export interface PricingProps {}

export default Pricing;
