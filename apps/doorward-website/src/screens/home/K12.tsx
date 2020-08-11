import React from 'react';
import Button from '@doorward/ui/components/Buttons/Button';

const K12: React.FunctionComponent<K12Props> = (props): JSX.Element => {
  return (
    <div className="site-section" id="k12-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">For K-12 Schools</h2>
            <p>
              Uninterrupted Live Classrooms at 2G Speed. Perfect E-Learning Solution for Indian Schools.
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <iframe width="504" height="283.5" src="https://www.youtube.com/embed/--DABXFd-Hs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="col-lg-4 mr-auto order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0"> Uninterrupted Live Classrooms at 2G Speed. Automatic Class Recordings for Offline Access. </h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0"> Create Assignments, Quiz, Member Notes and Send Notification Through Email or SMS. Accessible from Any Device - Computer or Mobile</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0"> Parents Meetings, Online Exams, Assessments, Members Progress Reports, Onboarding etc</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface K12Props {}

export default K12;
