import React, { ReactElement } from 'react';
import { Roles } from '../../../../../libs/ui/components/RolesManager';
import useRoleManager from '@edudoor/ui/hooks/useRoleManager';

const EditableView: React.FunctionComponent<EditableViewProps> = ({ isEditing = true, ...props }) => {
  const canCreate = useRoleManager(props.creator);
  const canView = useRoleManager(props.viewer);

  if (canCreate) {
    if (props.isViewing || !isEditing) {
      return React.cloneElement(props.viewerView, {
        key: 'viewer',
      });
    }
    return React.cloneElement(props.creatorView, {
      key: 'creator',
    });
  }
  if (canView || props.isViewing) {
    return React.cloneElement(props.viewerView, {
      key: 'viewer',
    });
  }
  return null;
};

export interface EditableViewProps {
  creatorView: ReactElement;
  viewerView: ReactElement;
  creator: Array<Roles>;
  viewer: Array<Roles>;
  isEditing?: boolean;
  isViewing?: boolean;
}

export default EditableView;
