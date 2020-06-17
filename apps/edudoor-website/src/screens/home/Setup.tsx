import React from 'react';

const Setup: React.FunctionComponent<SetupProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="setup-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Get Started in 3 Easy Steps</h2>
            <p>The initial setup takes 3 easy steps and 30 minutes time</p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/jukan-tateisi-bJhT_8nbUA0-unsplash.jpg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h4 className="m-0">1. Doorward will setup a Unique Website for your Institute.</h4>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h4 className="m-0">2. We will Create All Access Credentials for Your Teachers and Students.</h4>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h4 className="m-0">
                  3. Get Access to All LMS Features Free. Pay Only when Your Students Are Ready and Comfortable. .
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface SetupProps {}

export default Setup;
