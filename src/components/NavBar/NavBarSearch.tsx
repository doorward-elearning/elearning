import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import './NavBarSearch.scss';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

const NavBarSearch: React.FunctionComponent<NavBarSearchProps> = props => {
  const form = useRef(null);
  const [collapsed, setCollapsed] = useState(true);
  const [searchText, setSearchText] = useState('');

  useClickOutside(() => {
    if (!searchText) {
      setCollapsed(true);
    }
  }, form.current);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <form className={classNames({ 'nav-search-form': true, collapsed })} onSubmit={onSubmit} ref={form}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        name="query"
        value={searchText}
        onChange={onChange}
      />
      <button
        type="submit"
        className="btn submit"
        onClick={() => {
          collapsed && setCollapsed(false);
        }}
      >
        <Icon icon="search" />
      </button>
    </form>
  );
};

export interface NavBarSearchProps {}

export default NavBarSearch;
