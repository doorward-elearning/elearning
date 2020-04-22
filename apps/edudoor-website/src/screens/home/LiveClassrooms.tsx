import React from 'react';
import Button from '@edudoor/ui/components/Buttons/Button';

const LiveClassrooms: React.FunctionComponent<LiveClassroomsProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="classroom-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Unlimited Live Online Classrooms</h2>
            <div style={{ paddingBottom: '1em' }}>
              <Button
                theme="primary"
                onClick={() => {
                  window.location.href = process.env.EDUDOOR_APPLICATION_LINK + '/classrooms';
                }}
              >
                Browse Schools
              </Button>
            </div>
            <p>
              Do not change your current classroom workflow! Our online platform allow you to Create as much as online
              classrooms you want, Follow the same timetable and class calender, Permit any number of students and
              teachers to Join the class.!
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/undraw_teaching.svg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 mr-auto order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-black mb-4">Live Online Classrooms Features</h2>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Any device - A Computer or Mobile</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Teacher write on Whiteboard on her device</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* They see each other - Live Video Sharing</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* They talk each other - Live Audio / Chat</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0">* Students raise their hands with a mouse-click</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface LiveClassroomsProps {}

export default LiveClassrooms;
