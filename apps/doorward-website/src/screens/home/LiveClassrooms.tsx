import React from 'react';
import Button from '@doorward/ui/components/Buttons/Button';

const LiveClassrooms: React.FunctionComponent<LiveClassroomsProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="classroom-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">Live Online Classrooms</h2>
            <p>
              Create as Many Classrooms as You Want
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/undraw_teaching.svg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 mr-auto order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <div className="d-flex align-items-center custom-icon-wrap mb-3">
            <span>
              <span className="icon icon-graduation-cap" />
            </span>
            <div>
              <h3 className="m-0"> Uninterrupted Live Classrooms at 2G Speed. Perfect for Indian Schools. </h3>
            </div>
          </div>
          <div className="d-flex align-items-center custom-icon-wrap mb-3">
            <span>
              <span className="icon icon-graduation-cap" />
            </span>
            <div>
              <h3 className="m-0"> Easiest Classroom! Starts in One Click</h3>
            </div>
          </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0"> Features Audio, Video, ScreenSharing, Chat, Whiteboard</h3>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h3 className="m-0"> Accessible from Computer or Mobile</h3>
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
