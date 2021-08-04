import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../../Layout';
import { PageComponent } from '@doorward/ui/types';
import WebComponent from '@doorward/ui/components/WebComponent';
import Table from '@doorward/ui/components/Table';
import DoorwardApi from '../../../services/apis/doorward.api';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import { ModuleItemType } from '@doorward/common/types/moduleItems';

const AssignmentsList: React.FunctionComponent<AssignmentsListProps> = (props): JSX.Element => {
  const [apiAction, state] = useApiAction(DoorwardApi, (api) => api.courses.getCourseModuleItems);
  const match = useRouteMatch<{ courseId: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (match.params.courseId) {
      apiAction(match.params.courseId, { type: ModuleItemType.ASSIGNMENT });
    }
  }, [match]);
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
                navigation.navigate(ROUTES.courses.modules.items.view, {
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
