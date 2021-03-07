import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import GroupsTable from '../../components/Tables/GroupsTable';
import { PageComponent } from '@doorward/ui/types';
import Dropdown from '@doorward/ui/components/Dropdown';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import translate from '@doorward/common/lang/translate';
import useNavigation from '@doorward/ui/hooks/useNavigation';

function GroupList({ header, createRoute, type, onGroupClick, ...props }: GroupListProps): JSX.Element {
  const { query } = useQueryParams();
  const navigation = useNavigation();
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
        text: translate('addGroup'),
        onClick: () => {
          navigation.navigate(createRoute);
        },
      }}
    >
      <GroupsTable
        type={type}
        search={query.search}
        onRowClick={({ rowData: group }) => {
          onGroupClick(group.id);
        }}
        actionMenu={({ rowData: group }) => {
          return (
            <Dropdown.Menu>
              {props.onUpdate && (
                <Dropdown.Item
                  onClick={() => {
                    props.onUpdate(group.id);
                  }}
                >
                  {translate('edit')}
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
  createRoute: string;
  type: string;
  onGroupClick: (groupId: string) => void;
  onUpdate?: (groupId: string) => void;
}

export default GroupList;
