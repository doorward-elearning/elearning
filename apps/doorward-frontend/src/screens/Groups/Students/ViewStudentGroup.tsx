import React from 'react';
import { PageComponent } from '@doorward/ui/types';
import ViewGroup from '../ViewGroup';
import { useHistory } from 'react-router';

const ViewStudentGroup: React.FunctionComponent<ViewStudentGroupProps> = (props): JSX.Element => {
  const history = useHistory();
  return (
    <ViewGroup
      {...props}
      onEditGroup={(group) => {
        history.push(`/groups/student/${group.id}/update`);
      }}
    />
  );
};

export interface ViewStudentGroupProps extends PageComponent {}

export default ViewStudentGroup;
