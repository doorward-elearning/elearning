import React from 'react';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Table, { OnRowClick } from '@doorward/ui/components/Table';
import DoorwardApi from '../../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const TeacherReportTable: React.FunctionComponent<TeacherReportTableProps> = (props) => {
  const [apiAction, state] = useApiAction(DoorwardApi, (api) => api.reports.getTeachersReport);
  return (
    <SimpleWebComponent action={apiAction} state={state} dataSelector={(data) => data?.teachers}>
      {(data) => (
        <Table
          data={data}
          columns={{
            fullName: {
              title: translate('name'),
              cellRenderer: ({ rowData }) => rowData.fullName,
            },
            department: {
              title: translate('department'),
              cellRenderer: () => 'Computer Science',
            },
            courses: {
              title: translate('numberOfCourses'),
              cellRenderer: ({ rowData }) => rowData.courses.length,
            },
            ratings: {
              title: translate('rating'),
              cellRenderer: () => '4.5',
            },
          }}
          onRowClick={props.onRowClick}
        />
      )}
    </SimpleWebComponent>
  );
};

export interface TeacherReportTableProps {
  onRowClick: OnRowClick;
}

export default TeacherReportTable;
