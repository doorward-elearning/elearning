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
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4">
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    A Cloud-Based Online Classroom Solution For Schools.
                  </h1>
                  <p className="mb-4" data-aos="fade-up" data-aos-delay="200">
                    Conduct Your Classes From Anywhere, Any Device - A Computer or a Mobile Device..
                  </p>
                  <p data-aos="fade-up" data-aos-delay="300">
                    <a
                      href={process.env.EDUDOOR_APPLICATION_LINK + '/login'}
                      className="btn btn-primary py-3 px-5 btn-pill"
                    >
                      Login Now
                    </a>
                  </p>
                </div>

                <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                  <Panel style={{ padding: '2em', borderRadius: '10px' }}>
                    <h2 style={{ color: '#cc33ff' }}>One-Click FREE Trial</h2>
                    <h4 className="mb-4">
                      <br />
                      No credit cards required
                      <br />
                    </h4>
                    <FreeTrialForm
                      onSuccess={school => {
                        window.location.href =
                          process.env.EDUDOOR_APPLICATION_LINK + `/classrooms?newSchool=${school?.id}`;
                      }}
                    />
                    <div>
                      <span>Already have an account? </span>
                      <a href={process.env.EDUDOOR_APPLICATION_LINK + '/login'}>Login</a>
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
