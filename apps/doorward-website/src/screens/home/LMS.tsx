import React from 'react';

const Lms: React.FunctionComponent<LmsProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="lms-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Our E-Learning Platform</h2>
            <p>
              Don't Buy Forums. Create them Yourself
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/sam-balye-w1FwDvIreZU-unsplash.jpg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 mr-auto order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-black mb-4"> Your moderators can create Self-Paced Forums and enroll members. <br /><br />Moderators can Easily Create Contents such as Videos, HTML Tutorials, Assignments, Assessments, Quiz, Books. <br /><br /> We support all Indian Native Languages and Special Characters (Eg: Roman).<br /><br /> Automatic Reports.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface LmsProps {}

export default Lms;
