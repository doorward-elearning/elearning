import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import Tools from '@doorward/common/utils/Tools';
import * as H from 'history';

const NavLink: React.FunctionComponent<NavLinkProps> = (props): JSX.Element => {
  const location = useLocation();

  if (typeof props.to === 'string') {
    return <Link {...props} to={Tools.createRoute(props.to, props.params)} />;
  } else if ((props.to as any).pathname) {
    return (
      <Link {...props} to={{ ...props.to, pathname: Tools.createRoute((props.to as any).pathname, props.params) }} />
    );
  } else {
    const locationDescriptor = (props.to as (location: H.Location) => H.LocationDescriptor)(location);
    return <NavLink {...props} to={locationDescriptor} />;
  }
};

export interface NavLinkProps extends LinkProps {
  params?: Record<string, any>;
}

export default NavLink;
