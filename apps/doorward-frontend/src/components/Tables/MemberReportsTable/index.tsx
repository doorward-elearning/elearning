import React, { FunctionComponent } from 'react';
import Table from '@doorward/ui/components/Table';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import { fetchMemberReportsList } from '../../../reducers/reports/actions';
import { State } from '../../../store';
import { Member } from '@doorward/common/models/Member';

const MemberReportsTable: FunctionComponent<MemberReportsTableProps> = (props): JSX.Element => (
  <SimpleWebComponent
    action={fetchMemberReportsList}
    selector={(state: State) => state.reports.memberReportList}
    dataSelector={data => data.members}
  >
    {(data): JSX.Element => (
      <Table
        searchText={props.filter}
        filter={(data1, text): typeof data1 =>
          data1.filter((member: Member) => {
            return new RegExp(text, 'ig').test(member.fullName);
          })
        }
        data={data}
        columns={{
          name: 'Name',
          department: 'Department',
          enrollments: 'No of enrollments',
          courses: 'Courses completed',
          grade: 'Average Grade',
        }}
        getCell={row => {
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

export interface MemberReportsTableProps {
  onRowClick: (row: Member, index: number) => void;
  filter?: string;
}
export default MemberReportsTable;
