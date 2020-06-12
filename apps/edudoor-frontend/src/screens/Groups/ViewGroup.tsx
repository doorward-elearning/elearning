import React from 'react';
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

const ViewGroup: React.FunctionComponent<ViewGroupProps> = (props): JSX.Element => {
  usePageResource('groupId', fetchGroup);
  const state = useSelector((state: State) => state.groups.viewGroup);
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS]}
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

export interface ViewGroupProps extends PageComponent {}

export default ViewGroup;
