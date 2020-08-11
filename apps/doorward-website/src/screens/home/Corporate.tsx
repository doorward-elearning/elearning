import React from 'react';

const Corporate: React.FunctionComponent<CorporateProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="corporate-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">For Corporates</h2>
            <p>
              Our platform allow you to conduct your Employee training such as Skills Development, Onboarding elegantly.
              A highly interactive learning portal that allow your Employee to take self paced conferences and
              webconferences!
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <iframe width="504" height="283.5" src="https://www.youtube.com/embed/64yK8L99B-Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Self paced conferences for Employee Training</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Instructor lead online webconferences</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Employee Statistics and Projections</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Set Career Goals for Employees</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Conference and Instructor Measurements</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Feedback collection</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface CorporateProps {}

export default Corporate;
