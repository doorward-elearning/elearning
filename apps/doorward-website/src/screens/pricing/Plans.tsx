import React from 'react';

const Plans: React.FunctionComponent<PlansProps> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <div className="site-section conferences-title bg-dark" id="conferences-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
              <h2 className="section-title">Plans and Pricing</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section conferences-entry-wrap" data-aos="fade" data-aos-delay="100">
        <div className="container">
          <div className="row">
            <div className="owl-carousel col-12 nonloop-block-14">
              <div className="conference bg-white h-100 align-self-stretch">
                <figure className="m-0">
                  <a href="conference-single.html">
                    <img src="assets/images/img_2.jpg" alt="Image" className="img-fluid" />
                  </a>
                </figure>
                <div className="conference-inner-text py-4 px-4">
                  <span className="conference-price">350 INR</span>
                  <h3>
                    <a href="#">Institutes - Per Member Per Month</a>
                  </h3>
                </div>
              </div>

              <div className="conference bg-white h-100 align-self-stretch">
                <figure className="m-0">
                  <a href="conference-single.html">
                    <img src="assets/images/img_3.jpg" alt="Image" className="img-fluid" />
                  </a>
                </figure>
                <div className="conference-inner-text py-4 px-4">
                  <span className="conference-price">500 INR</span>
                  <h3>
                    <a href="#">Corporates - Per Employee Per Month</a>
                  </h3>
                </div>
              </div>

              <div className="conference bg-white h-100 align-self-stretch">
                <figure className="m-0">
                  <a href="conference-single.html">
                    <img src="assets/images/img_6.jpg" alt="Image" className="img-fluid" />
                  </a>
                </figure>
                <div className="conference-inner-text py-4 px-4">
                  <span className="conference-price">350 INR</span>
                  <h3>
                    <a href="#">Individuals - Per Member Per Month</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-7 text-center">
              <button className="customPrevBtn btn btn-primary m-1">Prev</button>
              <button className="customNextBtn btn btn-primary m-1">Next</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export interface PlansProps {}

export default Plans;
