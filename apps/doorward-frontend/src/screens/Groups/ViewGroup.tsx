import React, { useEffect } from 'react';
import usePageResource from '../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import ItemArray from '@doorward/ui/components/ItemArray';
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import Tools from '@doorward/common/utils/Tools';
import './ViewGroup.scss';
import useRoutes from '../../hooks/useRoutes';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import { SimpleGroupResponse } from '@doorward/common/dtos/response';

const ViewGroup: React.FunctionComponent<ViewGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', DoorwardApi.groups.getGroup);
  const state = useDoorwardApi((state) => state.groups.getGroup);
  const routes = useRoutes();

  useEffect(() => {
    if (state.data.group) {
      routes.setCurrentTitle(state.data.group?.name);
    }
  }, [state]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      actionBtnProps={{ text: 'Edit', icon: 'edit', onClick: () => props.onEditGroup(state.data.group) }}
      header={Tools.str(state.data.group?.name)}
    >
      <WebComponent data={state.data.group} loading={state.fetching}>
        {(group) => {
          return (
            <div className="ed-view-group">
              <ItemArray data={group.members}>{(item) => <SimpleUserView user={item} />}</ItemArray>
            </div>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewGroupProps extends PageComponent {
  onEditGroup?: (group: SimpleGroupResponse) => void;
}

export default ViewGroup;
