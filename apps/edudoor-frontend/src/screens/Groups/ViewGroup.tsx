import React, { useEffect } from 'react';
import usePageResource from '../../hooks/usePageResource';
import { fetchGroup } from '../../reducers/groups/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@edudoor/ui/components/WebComponent';
import ItemArray from '@edudoor/ui/components/ItemArray';
import SimpleUserView from '@edudoor/ui/components/UserChooser/SimpleUserView';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import Tools from '@edudoor/common/utils/Tools';
import './ViewGroup.scss';
import { Group } from '@edudoor/common/models/Group';
import useRoutes from '../../hooks/useRoutes';

const ViewGroup: React.FunctionComponent<ViewGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', fetchGroup);
  const state = useSelector((state: State) => state.groups.viewGroup);
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
        {group => {
          return (
            <div className="ed-view-group">
              <ItemArray data={group.members}>{item => <SimpleUserView user={item} />}</ItemArray>
            </div>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewGroupProps extends PageComponent {
  onEditGroup?: (group: Group) => void;
}

export default ViewGroup;
