import React from 'react';
import Table from '@doorward/ui/components/Table';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { DisplayDeviceType } from '@doorward/ui/hooks/useResponsiveness';

const TeachersTable: React.FunctionComponent<TeachersTableProps> = (props) => {
return (
<Table
{...props}
className="teachers-table"
sortable
columns={{
          username: { 
            title : translate('username'),
          },
          firstName: {
            title : translate('firstName'), 
          },
          email: {
            title : translate('email'), 
            minDisplay: DisplayDeviceType.DESKTOP
          },
          status: { 
            title :translate('status'),
            minDisplay: DisplayDeviceType.DESKTOP
          },
        }}
        data={props.teachers}
/>
);
};

export interface TeachersTableProps {
teachers: Array<UserEntity>;
}

export default TeachersTable;

