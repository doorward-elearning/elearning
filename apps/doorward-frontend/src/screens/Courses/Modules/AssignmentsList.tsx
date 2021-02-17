import React from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import Table from '@doorward/ui/components/Table';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';
import DoorwardApi from '../../../services/apis/doorward.api';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const AssignmentsList: React.FunctionComponent<AssignmentsListProps> = (props): JSX.Element => {
  const [apiAction, state] = useApiAction(DoorwardApi, (api) => api.courses.getCourseModuleItems);

  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('courseId', apiAction, [{ type: 'Assignment' }]);
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('assignment', { count: 100 })}
    >
      <WebComponent data={state.data?.items} loading={state.fetching}>
        {(assignments: Array<AssignmentEntity>) => {
          return (
            <Table
              height={400}
              data={assignments}
              columns={{
                title: {
                  title: translate('name'),
                },
                module: {
                  title: translate('module'),
                  cellRenderer: ({ rowData: row }) => row.module.title,
                },
                status: {
                  title: translate('status'),
                  cellRenderer: ({ rowData: row }) =>
                    row.assignmentSubmissions?.[0] ? translate('submitted') : translate('notSubmitted'),
                },
              }}
              onRowClick={({ rowData: row }) => {
                routes.navigate(routes.viewModuleItem, {
                  courseId,
                  moduleId: row.module.id,
                  itemId: row.id,
                });
              }}
            />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface AssignmentsListProps extends PageComponent {}

export default AssignmentsList;
