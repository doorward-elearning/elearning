import React from 'react';
import CreateTeacherForm from '../../components/forms/CreateTeacherForm';

const Home: React.FunctionComponent<HomeProps> = (props): JSX.Element => {
  return (
    <div className="intro-section" id="home-section">
      <div
        className="slide-1"
        style={{ backgroundImage: "url('http://edudoor.org/images/hero_1.jpg')" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4">
                  <h1 data-aos="fade-up" data-aos-delay="100">
                    Everything You Need For Teaching and Learning
                  </h1>
                  <p className="mb-4" data-aos="fade-up" data-aos-delay="200">
                    Edudoor is a platform for teachers to create and run courses, Instantly collaborate with students,
                    Collect feedbacks, share course materials, Conduct and track assessment, live virtual classroom, and
                    many more features that makes learning engaging..
                  </p>
                  <p data-aos="fade-up" data-aos-delay="300">
                    <a href="#" className="btn btn-primary py-3 px-5 btn-pill">
                      Login Now
                    </a>
                  </p>
                </div>

                <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                  <div className="form-box">
                    <h2 style={{ color: '#cc33ff' }}>One-Click FREE Trial</h2>
                    <h4 className="mb-4">
                      <br />
                      14 days free trial for Teachers <br />
                      No credit cards required
                      <br />
                    </h4>
                    <CreateTeacherForm />
                  </div>
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
