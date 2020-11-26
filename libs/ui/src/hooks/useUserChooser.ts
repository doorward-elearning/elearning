import { useCallback, useEffect, useState } from 'react';
import UserEntity from '@doorward/common/entities/user.entity';
import UserModel from '@doorward/common/models/user.model';

export interface UseUserChooser {
  selected: { string?: boolean };
  select: (id: string) => void;
  deselect: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  filteredUsers: Array<UserEntity>;
  users: Array<UserEntity>;
  count: number;
  filter: (query: string) => void;
}
const useUserChooser = (_users: Array<UserModel>, initiallySelectedUsers?: Array<UserEntity>): UseUserChooser => {
  const [selected, setSelected] = useState<{ [name: string]: boolean }>({});
  const [users, setUsers] = useState(_users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
    setFilteredUsers(users);
    setSelected(
      users.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.id]: !!selected[cur.id] || (initiallySelectedUsers || []).find((x) => x.id === cur.id),
        };
      }, {})
    );
  }, [users]);

  const createSelected = useCallback(
    (value: boolean) => {
      return users.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.id]: value,
        };
      }, {});
    },
    [users]
  );

  const filterFunction = useCallback(() => {
    const regex = new RegExp(filterString, 'ig');
    return users
      .filter((user) => {
        return !selected[user.id];
      })
      .filter((user) => {
        return regex.test(user.fullName) || regex.test(user.email) || regex.test(user.username);
      });
  }, [filterString, users, selected]);

  const chooseUser = useCallback(
    (id: string, choose: boolean) => {
      console.log(selected);
      setSelected({ ...selected, [id]: choose });
    },
    [selected, initiallySelectedUsers, filteredUsers]
  );

  useEffect(() => {
    setFilteredUsers(filterFunction());
  }, [filterString, users, selected]);

  return {
    selected,
    select: (id: string) => chooseUser(id, true),
    deselect: (id: string) => chooseUser(id, false),
    selectAll: () => {
      setSelected(createSelected(true));
    },
    deselectAll: () => {
      setSelected(createSelected(false));
    },
    count: Object.values(selected).reduce((acc, cur) => acc + (cur ? 1 : 0), 0),
    filteredUsers: filteredUsers,
    filter: setFilterString,
    users,
  };
};

export default useUserChooser;
