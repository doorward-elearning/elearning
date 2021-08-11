import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';

const StudentTable: React.FunctionComponent<StudentTableProps> = (props) => {
  const isMobile = window.innerWidth <= 500;
  return(
   isMobile === true ?  <Table
    {...props}
    className="student-table"
    columns={{
      username: {
        title: translate('username'),
      },
      firstName: {
        title: translate('firstName'),
      },
      
      
    }}
    data={props.students}
  
    onRowClick={props.onClickStudent}
  /> : <Table
  {...props}
  className="student-table"
  columns={{
    username: {
      title: translate('username'),
    },
    firstName: {
      title: translate('firstName'),
    },
    lastName: {
      title: translate('lastName'),
    },
    email: {
      title: translate('email'),
    },
    phoneNumber: {
      title: translate('phoneNumber'),
    },
    status: {
      title: translate('status'),
    },
  }}
  data={props.students}

  onRowClick={props.onClickStudent}
/>
   
  );
  
};

export interface StudentTableProps extends Omit<TableProps<UserEntity>, 'columns' | 'data'> {
  students: Array<UserEntity>;
  onClickStudent?: OnRowClick;
}

export default StudentTable;
