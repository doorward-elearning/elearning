import React from 'react';

const Pricing: React.FunctionComponent<PricingProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="pricing-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 mb-5 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Pricing</h2>
            <p className="mb-5">
              All mentioned Features are available at a rate of 140 INR Per Student Per Month (Billed Annually).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface PricingProps {}

export default Pricing;
