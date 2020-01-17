import React from 'react';
import { User } from '@edudoor/common/models/User';
import './UserChooser.scss';
import SimpleUserView from '@edudoor/ui/components/UserChooser/SimpleUserView';

const UserChooser: React.FunctionComponent<PeopleChooserProps> = (props): JSX.Element => {
  return (
    <div className="ed-user-chooser">
      <SimpleUserView />
    </div>
  );
};

export interface PeopleChooserProps {
  users: Array<User>;
}

export default UserChooser;
