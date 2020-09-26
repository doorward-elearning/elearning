import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table from '@doorward/ui/components/Table';
import DoorwardApi from '../../../services/apis/doorward.api';
import { TeacherReport } from '@doorward/common/dtos/response';

const TeacherReportTable: React.FunctionComponent<TeacherReportTableProps> = (props) => (
  <SimpleWebComponent
    action={DoorwardApi.reports.getTeachersReport}
    selector={(state) => state.reports.getTeachersReport}
    dataSelector={(data) => data.teachers}
  >
    {(data) => (
      <Table
        data={data}
        getCell={(row) => {
          return {
            fullName: row.fullName,
            department: 'Computer Science',
            courses: '' + row.courses.length,
            ratings: '4.5',
          };
        }}
        columns={{
          fullName: 'Name',
          department: 'Department',
          courses: 'No of courses',
          ratings: 'Ratings',
        }}
        onRowClick={props.onRowClick}
      />
    )}
  </SimpleWebComponent>
);

export interface TeacherReportTableProps {
  onRowClick: (row: TeacherReport, index: number) => void;
}

export default TeacherReportTable;
