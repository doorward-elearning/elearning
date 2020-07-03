import React from 'react';
import useRoutes from '../../hooks/useRoutes';
import Layout, { LayoutFeatures } from '../Layout';
import GroupsTable from '../../components/Tables/GroupsTable';
import { PageComponent } from '@edudoor/ui/types';
import { ROUTES } from '../../routes/routes';
import Dropdown from '@edudoor/ui/components/Dropdown';
import useQueryParams from '@edudoor/ui/hooks/useQueryParams';
import { SearchQueryBody } from '../../services/models/requestBody';

function GroupList({ header, createRoute, type, viewRoute, ...props }: GroupListProps): JSX.Element {
  const routes = useRoutes();
  const { query } = useQueryParams<SearchQueryBody>();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      header={header}
      suggestionsType="groups"
      searchQuery={{
        type,
      }}
      actionBtnProps={{
        text: 'Add Group',
        onClick: () => {
          routes.navigate(routes.routes[createRoute]);
        },
      }}
    >
      <GroupsTable
        type={type}
        search={query.search}
        onRowClick={group => {
          routes.navigate(routes[viewRoute], {
            groupId: group.id,
          });
        }}
        actionMenu={group => {
          return (
            <Dropdown.Menu>
              {props.updateRoute && (
                <Dropdown.Item
                  onClick={() => {
                    routes.navigate(routes[props.updateRoute], {
                      groupId: group.id,
                    });
                  }}
                >
                  Edit
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          );
        }}
      />
    </Layout>
  );
}

export interface GroupListProps extends PageComponent {
  header: string;
  createRoute: keyof typeof ROUTES;
  type: string;
  viewRoute: keyof typeof ROUTES;
  updateRoute?: keyof typeof ROUTES;
}

export default GroupList;
