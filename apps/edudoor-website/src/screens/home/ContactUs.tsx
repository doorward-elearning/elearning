import React from 'react';

const ContactUs: React.FunctionComponent<ContactUsProps> = (props): JSX.Element => {
  return (
    <div className="site-section bg-light" id="contact-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <h2 className="section-title mb-3">Contact US</h2>
            <p className="mb-5">
              <br />
              <h4>Our Branches:</h4><br />
              <b>BANGALORE</b><br />
              51, 3rd Cross Rd, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037 <br />
              Phone: +91-8197408582 <br />
              Email: info@edudoor.org
              <br /><br />
              <b>COCHIN</b><br />
              126A, Parayil, Anappara PO, Angamaly, Cochin - 683581 <br />
              Phone: +91-8197408582 <br />
              Email: info@edudoor.org
              <br />
              <br />
              Alternatively you can fill and submit the below form and we will get back to you.
            </p>

            <form method="post" data-aos="fade">
              <div className="form-group row">
                <div className="col-md-6 mb-3 mb-lg-0">
                  <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Last name" />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <textarea className="form-control" id="" cols={30} rows={10} placeholder="Write your message here." />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-6">
                  <input type="submit" className="btn btn-primary py-3 px-5 btn-block btn-pill" value="Send Message" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ContactUsProps {}

export default ContactUs;
