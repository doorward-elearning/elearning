import React, { useEffect, useMemo, useState } from 'react';
import { User } from '@edudoor/common/models/User';
import './UserChooser.scss';
import ItemArray from '../ItemArray';
import SimpleUserView from './SimpleUserView';
import IfElse from '../IfElse';
import Icon from '../Icon';
import { UseUserChooser } from '@edudoor/ui/hooks/useUserChooser';
import WebComponent from '../WebComponent';
import Search from '../Search';

const UserChooser: React.FunctionComponent<PeopleChooserProps> = (props): JSX.Element => {
  const { users, selected, select, count, filter } = props.useUserChooser;

  const filterFunction = useMemo(() => item => !selected[item.id], [selected]);

  useEffect(() => {
    props.onChange(users.filter(user => selected[user.id]));
  }, [selected]);

  return (
    <div className="ed-user-chooser__root">
      <Search onChange={filter} />
      <WebComponent
        data={count < users.length}
        loading={false}
        size="small"
        emptyMessage="No users"
        icon="account_circle"
      >
        {() => (
          <div className="ed-user-chooser">
            <ItemArray data={users} filter={props.removeOnSelection && filterFunction}>
              {item => (
                <SimpleUserView
                  user={item}
                  onClick={() => {
                    select(item.id);
                  }}
                >
                  <IfElse condition={selected[item.id]}>
                    <Icon icon="check" />
                  </IfElse>
                </SimpleUserView>
              )}
            </ItemArray>
          </div>
        )}
      </WebComponent>
    </div>
  );
};

export interface PeopleChooserProps {
  onChange: (users: Array<User>) => void;
  removeOnSelection?: boolean;
  useUserChooser: UseUserChooser;
}

export default UserChooser;
