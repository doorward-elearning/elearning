import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import DoorwardApi from '../../../services/apis/doorward.api';
import UserModel from '@doorward/common/models/user.model';
import translate from '@doorward/common/lang/translate';

const StudentReportsTable: FunctionComponent<StudentReportsTableProps> = (props): JSX.Element => (
  <SimpleWebComponent
    action={DoorwardApi.reports.getStudentsReport}
    selector={(state) => state.reports.getStudentsReport}
    dataSelector={(data) => data.students}
  >
    {(data): JSX.Element => (
      <Table
        searchText={props.filter}
        filter={(data1, text): typeof data1 =>
          data1.filter((student: UserModel) => {
            return new RegExp(text, 'ig').test(student.fullName);
          })
        }
        data={data}
        columns={{
          name: translate.name(),
          department: translate.department(),
          enrollments: translate.numberOfEnrollments(),
          courses: translate.coursesCompleted(),
          grade: translate.averageGrade(),
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

export interface StudentReportsTableProps {
  onRowClick: (row: UserModel, index: number) => void;
  filter?: string;
}
export default StudentReportsTable;
