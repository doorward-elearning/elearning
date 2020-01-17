import React, { useEffect, useState } from 'react';
import { PlainTextField } from '@edudoor/ui/components/Input/TextField';

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
      placeholder="Search..."
      labelPosition="none"
      icon="search"
      onChange={e => {
        setSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export interface SearchProps {
  search?: string;
  onChange: (search: string) => void;
}

export default Search;
