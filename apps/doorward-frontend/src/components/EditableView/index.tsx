import React, { ReactElement } from 'react';
import usePrivileges from '@doorward/ui/hooks/usePrivileges';

const EditableView: React.FunctionComponent<EditableViewProps> = ({ isEditing = true, ...props }) => {
  const hasPrivileges = usePrivileges();

  if (hasPrivileges(...props.creatorPrivileges)) {
    if (props.isViewing || !isEditing) {
      return React.cloneElement(props.viewerView, {
        key: 'viewer',
      });
    }
    return React.cloneElement(props.creatorView, {
      key: 'creator',
    });
  }
  if (hasPrivileges(...props.viewerPrivileges) || props.isViewing) {
    return React.cloneElement(props.viewerView, {
      key: 'viewer',
    });
  }
  return null;
};

export interface EditableViewProps {
  creatorView: ReactElement;
  viewerView: ReactElement;
  creatorPrivileges: Array<string>;
  viewerPrivileges: Array<string>;
  isEditing?: boolean;
  isViewing?: boolean;
}

export default EditableView;
