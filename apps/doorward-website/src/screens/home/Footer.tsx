import React from 'react';

const Footer: React.FunctionComponent<FooterProps> = (props): JSX.Element => {
  return (
    <footer className="footer-section bg-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>About Doorward</h3>
            <p>
              We are a startup based out in India and our mission is to help and promote enhanced learning habits.
            </p>
            <p>
              <br />
              <h4>Our Branches:</h4><br />
              <b>BANGALORE</b><br />
              51, 3rd Cross Rd, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037 <br />
              Phone: +91-8197408582
              <br /><br />
              <b>COCHIN</b><br />
              126A, Parayil, Anappara PO, Angamaly, Cochin - 683581 <br />
              Phone: +91-8197408582

            </p>
          </div>

          <div className="col-md-3 ml-auto">
            <h3>Links</h3>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Programs</a>
              </li>
              <li>
                <a href="#">Moderators</a>
              </li>
              <li>
                <a href="tos.html">Terms</a>
              </li>
              <li>
                <a href="pp.html">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <div className="border-top pt-5">
              <p>
                Copyright &copy;
                <script>{new Date().getFullYear()}</script>
                All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export interface FooterProps {}

export default Footer;
