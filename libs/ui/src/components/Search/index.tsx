import React, { useEffect, useState } from 'react';
import { PlainTextField } from '@doorward/ui/components/Input/TextField';
import Icon from '@doorward/ui/components/Icon';
import './Search.scss';
import IfElse from '@doorward/ui/components/IfElse';
import translate from '@doorward/common/lang/translate';

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
      placeholder={props.placeholder || translate('searchPlaceholder')}
      labelPosition="none"
      className="ed-search"
      icon="search"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      value={search}
    >
      <IfElse condition={search}>
        <Icon
          icon="close"
          className="close-icon"
          onClick={() => {
            setSearch('');
          }}
        />
      </IfElse>
    </PlainTextField>
  );
};

export interface SearchProps {
  search?: string;
  onChange: (search: string) => void;
  placeholder?: string;
}

export default Search;
