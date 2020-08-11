import React from 'react';

const College: React.FunctionComponent<CollegeProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="college-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">For Colleges</h2>
            <p>
              A Single Platform That Overcomes All Your College Challenges
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <br /><br /><iframe width="504" height="283.5" src="https://www.youtube.com/embed/ZiCy6lnj2Zo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Build Self-Paced Video Courses, Live Classrooms, Live Conferences, Interactive Projects, Seminars, Tech-Fests, Classrooms, Placement Drives, Internship,  Placement Programs</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Accurately Track and Report Every Member Activities. Automatically Build Public Profiles of Your College, Moderators, and Members</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Your Own Website Branded with College Name</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface CollegeProps {}

export default College;
