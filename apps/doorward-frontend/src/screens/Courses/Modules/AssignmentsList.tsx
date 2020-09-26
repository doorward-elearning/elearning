import React from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import Table from '@doorward/ui/components/Table';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import DoorwardApi from '../../../services/apis/doorward.api';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';

const AssignmentsList: React.FunctionComponent<AssignmentsListProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.courses.getCourseModuleItems);

  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('courseId', DoorwardApi.courses.getCourseModuleItems, ['Assignment']);
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} header="Assignments">
      <WebComponent data={state.data.items} loading={state.fetching}>
        {(assignments: Array<ModuleItemEntity>) => {
          return (
            <Table
              data={assignments}
              columns={{ title: 'Name', module: 'Module', status: 'Status' }}
              getCell={(row) => {
                return {
                  module: row.module.title,
                  status: row.assignmentSubmissions?.[0] ? 'Submitted' : 'Not Submitted',
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
