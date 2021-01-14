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
import useApiAction from '@doorward/ui/hooks/useApiAction';

const AssignmentsList: React.FunctionComponent<AssignmentsListProps> = (props): JSX.Element => {
  const apiAction = useApiAction(DoorwardApi, (api) => api.courses.getCourseModuleItems);

  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('courseId', apiAction.action, [{ type: 'Assignment' }]);
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('assignment', { count: 100 })}
    >
      <WebComponent data={apiAction.state.data.items} loading={apiAction.state.fetching}>
        {(assignments: Array<AssignmentEntity>) => {
          return (
            <Table
              data={assignments}
              columns={{ title: translate('name'), module: translate('module'), status: translate('status') }}
              getCell={(row) => {
                return {
                  module: row.module.title,
                  status: row.assignmentSubmissions?.[0] ? translate('submitted') : translate('notSubmitted'),
                };
              }}
              onRowClick={(row) => {
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
