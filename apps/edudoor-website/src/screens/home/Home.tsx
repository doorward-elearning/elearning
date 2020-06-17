import React from 'react';
import FreeTrialForm from '../../components/forms/FreeTrialForm';
import Panel from '@edudoor/ui/components/Panel';

const Home: React.FunctionComponent<HomeProps> = (props): JSX.Element => {
  return (
    <div className="intro-section" id="home-section">
      <div
        className="slide-1"
        data-stellar-background-ratio="0.5"
        style={{ backgroundImage: "url('assets/images/hero_1.jpg')" }}
      >
        <div className="container container-smaller">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4">
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    India's Easiest E-Learning Platform for All Institutes
                  </h1>
                  <br />
                  <p Style="color:white" className="mb-4" data-aos="fade-up" data-aos-delay="200">
                    All Your Learning-Needs Under One Roof.<br />Live Online Classrooms, Video Course Builder, Assignments, Assessments, Attendance, Projects, External Programs, Student Reports, Parents Access, Email IDs
                  </p>
                </div>

                <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                  <Panel style={{ padding: '2em', borderRadius: '10px' }}>
                    <h2 style={{ color: '#855FF9' }}>Try Doorward Free</h2>
                    <FreeTrialForm
                      onSuccess={school => {
                        window.location.href =
                          process.env.EDUDOOR_APPLICATION_LINK + `/classrooms?newSchool=${school?.id}`;
                      }}
                    />
                    <div>
                      <span>Already have a school account? </span>
                      <a href={process.env.EDUDOOR_APPLICATION_LINK + '/classrooms'}>Join Classroom</a>
                    </div>
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface HomeProps {}

export default Home;
