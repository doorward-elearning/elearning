import React from 'react';
import Table, { OnRowClick, TableProps } from '@doorward/ui/components/Table';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { DisplayDeviceType } from '@doorward/ui/hooks/useResponsiveness';

const StudentTable: React.FunctionComponent<StudentTableProps> = (props) => {
  return (
    <Table
      {...props}
      className="student-table"
      columns={{
        username: {
          title: translate('username'),
        },
        firstName: {
          title: translate('firstName'),
          minDisplay: DisplayDeviceType.DESKTOP,
        },
        lastName: {
          title: translate('lastName'),
          minDisplay: DisplayDeviceType.DESKTOP,
        },
        email: {
          title: translate('email'),
        },
        status: {
          title: translate('status'),
          minDisplay: DisplayDeviceType.DESKTOP,
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
