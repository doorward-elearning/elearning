import React from 'react';

const AuthRoute: React.FunctionComponent<AuthRouteProps> = ({ component }) => {
  return <div></div>;
};

export interface AuthRouteProps {
  component: React.FunctionComponent | React.ReactNode;
  authenticated?: boolean;
}

export default AuthRoute;
