import React from 'react';

const Setup: React.FunctionComponent<SetupProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="setup-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Get Started in 30 Minutes</h2>
            <p>Yes, you heard it right.! The initial setup takes 4 simple steps and 30 minutes time.!</p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/jukan-tateisi-bJhT_8nbUA0-unsplash.jpg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-black mb-4">4 simple steps to begin!!</h2>

            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">1. Upload an excel sheet with staff and student details.</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">2. You will receive Login Credentials of everyone in Email.</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">
                  3. Ask your Teachers Login and create Classrooms and Timetable for each classroom.
                </h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">4. Ask your students to Login and Join their respective classroom.</h3>
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
