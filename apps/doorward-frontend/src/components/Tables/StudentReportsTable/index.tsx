import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import DoorwardApi from '../../../services/apis/doorward.api';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const StudentReportsTable: FunctionComponent<StudentReportsTableProps> = (props): JSX.Element => {
  const [studentsReport, state] = useApiAction(DoorwardApi, (api) => api.reports.getStudentsReport);

  return (
    <SimpleWebComponent action={studentsReport} state={state} dataSelector={(data) => data?.students}>
      {(data): JSX.Element => (
        <Table
          searchText={props.filter}
          filter={(data1, text): typeof data1 =>
            data1.filter((student: UserEntity) => {
              return new RegExp(text, 'ig').test(student.fullName);
            })
          }
          data={data}
          columns={{
            name: translate('name'),
            department: translate('department'),
            enrollments: translate('numberOfEnrollments'),
            courses: translate('coursesCompleted'),
            grade: translate('averageGrade'),
          }}
          getCell={(row) => {
            return {
              name: row.fullName,
              department: 'Computer Science',
              enrollments: '23',
              courses: '12',
              grade: '12.4',
            };
          }}
          onRowClick={props.onRowClick}
        />
      )}
    </SimpleWebComponent>
  );
};

export interface StudentReportsTableProps {
  onRowClick: (row: UserEntity, index: number) => void;
  filter?: string;
}
export default StudentReportsTable;
