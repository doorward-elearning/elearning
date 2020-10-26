import React, { useEffect, useMemo } from 'react';
import './UserChooser.scss';
import ItemArray from '../ItemArray';
import SimpleUserView from './SimpleUserView';
import IfElse from '../IfElse';
import Icon from '../Icon';
import { UseUserChooser } from '@doorward/ui/hooks/useUserChooser';
import WebComponent from '../WebComponent';
import Search from '../Search';
import VerticalScroll from '@doorward/ui/components/VerticalScroll';
import NavBarSearch from '../NavBar/NavBarSearch';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';

const UserChooser: React.FunctionComponent<PeopleChooserProps> = (props): JSX.Element => {
  const { users, filteredUsers, selected, select, filter } = props.useUserChooser;

  const filterFunction = useMemo(() => (item) => !selected[item.id], [selected]);

  useEffect(() => {
    props.onChange(users.filter((user) => selected[user.id]));
  }, [selected]);

  return (
    <div className="ed-user-chooser__root">
      <NavBarSearch onSearch={filter} instantSearch />
      <VerticalScroll maxHeight={500}>
        <WebComponent
          data={filteredUsers}
          loading={false}
          size="small"
          emptyMessage={translate.noUsers()}
          icon="account_circle"
        >
          {() => (
            <div className="ed-user-chooser">
              <ItemArray data={filteredUsers} filter={props.removeOnSelection && filterFunction}>
                {(item) => (
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
      </VerticalScroll>
    </div>
  );
};

export interface PeopleChooserProps {
  onChange: (users: Array<UserEntity>) => void;
  removeOnSelection?: boolean;
  useUserChooser: UseUserChooser;
}

export default UserChooser;
