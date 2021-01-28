import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table from '@doorward/ui/components/Table';
import DoorwardApi from '../../../services/apis/doorward.api';
import { TeacherReport } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const TeacherReportTable: React.FunctionComponent<TeacherReportTableProps> = (props) => {
  const [apiAction, state] = useApiAction(DoorwardApi, (api) => api.reports.getTeachersReport);
  return (
    <SimpleWebComponent action={apiAction} state={state} dataSelector={(data) => data?.teachers}>
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
            fullName: translate('name'),
            department: translate('department'),
            courses: translate('numberOfCourses'),
            ratings: translate('rating'),
          }}
          onRowClick={props.onRowClick}
        />
      )}
    </SimpleWebComponent>
  );
};

export interface TeacherReportTableProps {
  onRowClick: (row: TeacherReport, index: number) => void;
}

export default TeacherReportTable;
