import React, { ReactElement } from 'react';
import { Roles } from '../RolesManager';
import useRoleManager from '../../../hooks/useRoleManager';

const EditableView: React.FunctionComponent<EditableViewProps> = ({ isEditing = true, ...props }) => {
  const canCreate = useRoleManager(props.creator);
  const canView = useRoleManager(props.viewer);

  if (canCreate) {
    if (props.isViewing || !isEditing) {
      return props.viewerView;
    }
    return props.creatorView;
  }
  if (canView || props.isViewing) {
    return props.viewerView;
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
