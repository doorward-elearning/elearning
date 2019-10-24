import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';

const BreadCrumbs: FunctionComponent<BreadCrumbsProps> = ({ crumbs }): JSX.Element => {
  return (
    <div className="ed-breadcrumbs">
      {crumbs.map(crumb => {
        return (
          <div className="ed-breadcrumbs__crumb" key={crumb.link}>
            <Link to={crumb.link}>{crumb.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export type BreadCrumb = {
  name: string;
  link: string;
};

export interface BreadCrumbsProps {
  crumbs: Array<BreadCrumb>;
}

export default BreadCrumbs;
