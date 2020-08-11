import React from 'react';

const AboutUs: React.FunctionComponent<AboutUsProps> = (props): JSX.Element => {
  return (
    <div className="site-section" id="about-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 mb-5 text-center" data-aos="fade-up" data-aos-delay="">
            <h2 className="section-title">About US</h2>
            <p className="mb-5">
              Doorward E-Learning is a platform for moderators to create and run forums, Instantly collaborate with members, Collect
              feedback, share forum materials, Conduct and track assessment, live virtual classroom, and many more
              features that makes learning engaging. <br />
              <br />
              We serve LMS platform to Individual Trainers, Corporates, Schools and any educational institutes across
              the world. We aim to make Education and Learning, a better experience.
            </p>
            <br />
            <h5>Our Team</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="moderator text-center">
              <div className="py-2">
                <h3 className="text-black">Basil Varghese</h3>
                <p className="position">Managing Director</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="moderator text-center">
              <div className="py-2">
                <h3 className="text-black">Susanna K Kurian</h3>
                <p className="position">Co-Founder</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="moderator text-center">
              <div className="py-2">
                <h3 className="text-black">Moses Gitau</h3>
                <p className="position">Senior Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface AboutUsProps {}

export default AboutUs;
