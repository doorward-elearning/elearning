import React from 'react';

const IndividualTrainers: React.FunctionComponent<IndividualTrainersProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="trainer-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Solutions for Trainers</h2>
            <p>
              Our Individual Trainer platform allow you to create live courses and self paced trainings, collect real
              time automated feedbacks, Interact easily with students, and many more. Save your time by leaving your
              repeated jobs to our platform!
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src="http://edudoor.org/images/undraw_teaching.svg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 mr-auto order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-black mb-4">Save time. Focus On What Is Important</h2>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Take Intructor Lead Trainings</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Create Self-paced courses</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Online Live Classrooms</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Automate Student Assessments</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Track your students reports</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Automated Reminders to Students</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap"/>
              </span>
              <div>
                <h3 className="m-0">Engage You Sales Managers</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface IndividualTrainersProps {}

export default IndividualTrainers;
