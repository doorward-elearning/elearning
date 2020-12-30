import { useEffect, useState } from 'react';

export type UseSearch<T> = {
  filtered: Array<T>;
  search: string;
  setSearch: (search: string) => void;
};

const useSearch = <T>(data: Array<T>, filterFunction: (search: string, item: T) => boolean): UseSearch<T> => {
  const [filtered, setFiltered] = useState(data);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFiltered(data.filter((item) => filterFunction(search, item)));
  }, [search, data]);

  return {
    filtered,
    search,
    setSearch,
  };
};

export default useSearch;
