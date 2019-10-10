import React from 'react';

const NavBarSearch: React.FunctionComponent<NavBarSearchProps> = props => {
  return (
    <form className="search-form-opened" action="#" method="GET">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search..." name="query" />
        <span className="input-group-btn">
          <a href="javascript:void(0)" className="btn submit">
            <i className="icon-magnifier" />
          </a>
        </span>
      </div>
    </form>
  );
};

export interface NavBarSearchProps {}

export default NavBarSearch;
