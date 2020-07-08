import React from 'react';
import FreeTrialForm from '../../components/forms/FreeTrialForm';
import Panel from '@doorward/ui/components/Panel';

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
                    India's Easiest Learning Platform with Live Classrooms
                  </h1>
                  <br />
                  <p Style="color:white" className="mb-4" data-aos="fade-up" data-aos-delay="200">
                    Uninterrupted Live Classrooms at 2G Speed. <br /> <br /> Live Classrooms, Recordings, Assignments, Assessments, Attendance, Projects, Reports, Parents, Email IDs
                  </p>
                </div>

                <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                  <Panel style={{ padding: '2em', borderRadius: '10px' }}>
                    <h2 style={{ color: '#855FF9' }}>Try Doorward Free</h2>
                    <FreeTrialForm
                      onSuccess={school => {
                        window.location.href =
                          process.env.DOORWARD_APPLICATION_LINK + `/classrooms?newSchool=${school?.id}`;
                      }}
                    />
                    <div>
                      <span>Already have a school account? </span>
                      <a href={process.env.DOORWARD_APPLICATION_LINK + '/classrooms'}>Join Classroom</a>
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
