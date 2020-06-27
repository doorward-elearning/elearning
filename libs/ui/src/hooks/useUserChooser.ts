import { useCallback, useEffect, useMemo, useState } from 'react';
import { User } from '@edudoor/common/models/User';

export interface UseUserChooser {
  selected: { string?: boolean };
  select: (id: string) => void;
  deselect: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  users: Array<User>;
  count: number;
  filter: (query: string) => void;
}
const useUserChooser = (users: Array<User>, initiallySelectedUsers?: Array<User>): UseUserChooser => {
  const createSelected = (value: boolean) => {
    return users.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.id]: value,
      };
    }, {});
  };
  const [selected, setSelected] = useState<{ [name: string]: boolean }>({});
  const [count, setCount] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const chooseUser = useCallback(
    (id: string, choose: boolean) => {
      setSelected({ ...selected, [id]: choose });
      setCount(count + (choose ? 1 : -1));
    },
    [selected, count, initiallySelectedUsers]
  );

  useEffect(() => {
    setFilteredUsers(users);
    setSelected(
      users.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.id]: !!selected[cur.id] || (initiallySelectedUsers || []).find(x => x.id === cur.id),
        };
      }, {})
    );
  }, [users]);

  const filter = useMemo(
    () => (query: string) => {
      const regex = new RegExp(query, 'ig');
      setFilteredUsers(
        users.filter(user => {
          return regex.test(user.fullName) || regex.test(user.email);
        })
      );
    },
    [users]
  );

  return {
    selected,
    select: (id: string) => chooseUser(id, true),
    deselect: (id: string) => chooseUser(id, false),
    selectAll: () => {
      setSelected(createSelected(true));
      setCount(users.length);
    },
    deselectAll: () => {
      setSelected(createSelected(false));
      setCount(0);
    },
    count,
    users: filteredUsers,
    filter,
  };
};

export default useUserChooser;
