import React from 'react';

const Emails: React.FunctionComponent<EmailsProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="email-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Domain Based Email IDs (user@school.com)</h2>
            <p>
              Everyone - Staffs, Teachers, and students gets a personnel email ID for communication. Email Account can
              be accessed from a Browser (Like Gmail), or it may be configured on an Android/iPhones.!
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/postit-1975188_640.png" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-black mb-4">Personnel Email IDs</h2>

            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Every students and teachers get Email IDs</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Bulk Email to all students of specific class</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Receive notification about Students</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Receive Assignment Reports</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Receive Quiz Reports</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Emergency Notifications</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface EmailsProps {}

export default Emails;
