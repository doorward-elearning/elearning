import React from 'react';

const WhyUs: React.FunctionComponent<WhyUsProps> = (props): JSX.Element => {
  return (
    <div className="site-section pb-0">
      <div className="future-blobs">
        <div className="blob_2">
          <img src="http://edudoor.org/images/blob_2.svg" alt="Image" />
        </div>
        <div className="blob_1">
          <img src="http://edudoor.org/images/blob_1.svg" alt="Image" />
        </div>
      </div>
      <div className="container">
        <div className="row mb-5 justify-content-center" data-aos="fade-up" data-aos-delay="">
          <div className="col-lg-7 text-center">
            <h2 className="section-title">Why Choose Us</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 ml-auto align-self-start" data-aos="fade-up" data-aos-delay="100">
            <div className="p-4 rounded bg-white why-choose-us-box">
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-graduation-cap" />
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Pay as you use plan</h3>
                </div>
              </div>

              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-university" />
                  </span>
                </div>
                <div>
                  <h3 className="m-0">One platform for all needs</h3>
                </div>
              </div>

              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-graduation-cap" />
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Technology experts</h3>
                </div>
              </div>

              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-university" />
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Highly scalable Solutions</h3>
                </div>
              </div>

              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-graduation-cap" />
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Course creation assistance</h3>
                </div>
              </div>

              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-university" />
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Perfect business partner</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 align-self-end" data-aos="fade-left" data-aos-delay="200">
            <img src="http://edudoor.org/images/person_transparent.png" alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface WhyUsProps {}

export default WhyUs;
