import React from 'react';
import Table from '../../../ui/Table';
import { Student } from '../../../../services/models';
import SimpleWebComponent, { SimpleWebConsumer } from '../../../ui/WebComponent/SimpleWebComponent';
import { fetchStudentReportsList } from '../../../../reducers/reports/actions';
import { State } from '../../../../store';

const StudentReportsTable: SimpleWebConsumer<StudentReportsTableProps, Array<Student>> = data => {
  return (props): JSX.Element => (
    <Table
      searchText={props.filter}
      filter={(data1, text) => data1.filter((student: Student) => new RegExp(text, 'ig').test(student.fullName))}
      data={data}
      columns={{
        name: 'Name',
        department: 'Department',
        enrollments: 'No of enrollments',
        courses: 'Courses completed',
        grade: 'Average Grade',
      }}
      getCell={(row, index, column): string => {
        const data = {
          name: row.fullName,
          department: 'Computer Science',
          enrollments: '23',
          courses: '12',
          grade: '12.4',
        };
        return data[column as keyof typeof data];
      }}
      onRowClick={props.onRowClick}
    />
  );
};

export interface StudentReportsTableProps {
  onRowClick: (row: Student, index: number) => void;
  filter?: string;
}

export default SimpleWebComponent({
  action: fetchStudentReportsList,
  selector: (state: State) => state.reports.studentReportList,
  data: data => data.students,
})(StudentReportsTable);
