import React from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '@edudoor/ui/types';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { fetchModuleItems } from '../../../reducers/courses/actions';
import usePageResource from '@edudoor/ui/hooks/usePageResource';
import WebComponent from '@edudoor/ui/components/WebComponent';
import Table from '@edudoor/ui/components/Table';
import { Assignment } from '@edudoor/common/models/Assignment';
import useViewCourse from '../../../hooks/useViewCourse';
import useRoutes from '../../../hooks/useRoutes';

const AssignmentsList: React.FunctionComponent<AssignmentsListProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.courses.moduleItemList);

  const routes = useRoutes();
  const [courseId] = useViewCourse();
  usePageResource('courseId', fetchModuleItems, ['Assignment']);
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]} header="Assignments">
      <WebComponent data={state.data.items} loading={state.fetching}>
        {(assignments: Array<Assignment>) => {
          return (
            <Table
              data={assignments}
              columns={{ title: 'Name', module: 'Module', status: 'Status' }}
              getCell={row => {
                return {
                  module: row.module.title,
                  status: 'Not Submitted',
                };
              }}
              onRowClick={row => {
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
