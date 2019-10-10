import React, { FunctionComponent } from 'react';
import { PageComponent } from '../../types';
import { Link } from 'react-router-dom';

const NotFound: FunctionComponent<NotFoundProps> = (): JSX.Element => {
  return (
    <div className="limiter">
      <div className="container-login100 page-background">
        <div className="wrap-login100">
          <form className="form-404">
            <span className="login100-form-logo">
              <img alt="" src="../assets/img/logo-2.png" />
            </span>
            <span className="form404-title p-b-34 p-t-27">Error 404</span>
            <p className="content-404">The page you are looking for does't exist or an other error occurred.</p>
            <div className="container-login100-form-btn">
              <Link to="/" className="login100-form-btn">
                Go to home page
              </Link>
            </div>
            <div className="text-center p-t-27">
              <a className="txt1" href="#">
                Need Help?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export interface NotFoundProps extends PageComponent {}

export default NotFound;
