import React, { useEffect } from 'react';
import WebComponent from '@doorward/ui/components/WebComponent';
import ItemArray from '@doorward/ui/components/ItemArray';
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import Tools from '@doorward/common/utils/Tools';
import './ViewGroup.scss';
import DoorwardApi from '../../services/apis/doorward.api';
import { SimpleGroupResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';

const ViewGroup: React.FunctionComponent<ViewGroupProps> = (props): JSX.Element => {
  const [getGroup, groupState] = useApiAction(DoorwardApi, (state) => state.groups.getGroup);
  const {
    params: { groupId },
  } = useRouteMatch();

  useEffect(() => {
    if (groupId) {
      getGroup(groupId);
    }
  }, [groupId]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      actionBtnProps={{
        text: translate('edit'),
        icon: 'edit',
        onClick: () => props.onEditGroup(groupState.data?.group),
      }}
      header={Tools.str(groupState.data?.group?.name)}
    >
      <WebComponent data={groupState.data?.group} loading={groupState.fetching}>
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
