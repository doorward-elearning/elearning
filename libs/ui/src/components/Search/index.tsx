import React, { useEffect, useState } from 'react';
import { PlainTextField } from '@edudoor/ui/components/Input/TextField';
import Icon from '@edudoor/ui/components/Icon';
import './Search.scss';

const Search: React.FunctionComponent<SearchProps> = (props): JSX.Element => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    props.search && setSearch(props.search);
  }, [props.search]);

  useEffect(() => {
    props.onChange(search);
  }, [search]);
  return (
    <PlainTextField
      placeholder={props.placeholder || 'Search...'}
      labelPosition="none"
      className="ed-search"
      icon="search"
      onChange={e => {
        setSearch(e.target.value);
      }}
      value={search}
    >
      <Icon
        icon="close"
        className="close-icon"
        onClick={() => {
          setSearch('');
        }}
      />
    </PlainTextField>
  );
};

export interface SearchProps {
  search?: string;
  onChange: (search: string) => void;
  placeholder?: string;
}

export default Search;
