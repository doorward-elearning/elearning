import React from 'react';

const Emails: React.FunctionComponent<EmailsProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="email-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Email ID Services student@school.com</h2>
            <p>
              Every Staff, Teacher, and Student gets a Personnel email ID.
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/postit-1975188_640.png" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-black mb-4">Personal Email ID are Useful for Offline Collaboration and Notification Services <br /><br /> You may send Emails to an Individual Student, A Batch, A Classroom, Or An Entire School, with One-Click </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface EmailsProps {}

export default Emails;
