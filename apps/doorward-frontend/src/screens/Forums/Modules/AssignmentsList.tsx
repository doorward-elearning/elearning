import React from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '@doorward/ui/types';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { fetchModuleItems } from '../../../reducers/forums/actions';
import usePageResource from '../../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import Table from '@doorward/ui/components/Table';
import { Assignment } from '@doorward/common/models/Assignment';
import useViewForum from '../../../hooks/useViewForum';
import useRoutes from '../../../hooks/useRoutes';

const AssignmentsList: React.FunctionComponent<AssignmentsListProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.forums.moduleItemList);

  const routes = useRoutes();
  const [forumId] = useViewForum();
  usePageResource('forumId', fetchModuleItems, ['Assignment']);
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
                  status: row.assignmentSubmission ? 'Submitted' : 'Not Submitted',
                };
              }}
              onRowClick={row => {
                routes.navigate(routes.viewModuleItem, {
                  forumId,
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
