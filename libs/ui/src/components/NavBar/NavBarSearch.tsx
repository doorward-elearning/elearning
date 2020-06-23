import React, { FormEvent, useRef, useState } from 'react';
import './NavBarSearch.scss';
import classNames from 'classnames';
import useStateRef from '../../hooks/useStateRef';

const NavBarSearch: React.FunctionComponent<NavBarSearchProps> = props => {
  const form = useRef(null);
  const [searchText, setSearchText] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <form className={classNames({ 'nav-search-form': true })} onSubmit={onSubmit} ref={form}>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder || 'Search...'}
        name="search"
        value={searchText}
        onChange={onChange}
      />
    </form>
  );
};

export interface NavBarSearchProps {
  placeholder?: string;
}

export default NavBarSearch;
