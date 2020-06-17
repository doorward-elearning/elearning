import React from 'react';
import Button from '@edudoor/ui/components/Buttons/Button';

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
                <h4 className="m-0"> Live Online Classrooms Features Audio, Video, ScreenSharing, Chat, Whiteboard etc</h4>
              </div>
            </div>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span>
                <span className="icon icon-graduation-cap" />
              </span>
              <div>
                <h4 className="m-0"> Accessible from Any Device - Computer or Mobile</h4>
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
