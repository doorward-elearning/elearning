import React from 'react';
import EditableView from '../../../components/EditableView';
import Panel from '@doorward/ui/components/Panel';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';
import useForm from '@doorward/ui/hooks/useForm';
import AddModuleVideoForm from '../../../components/Forms/AddModuleVideoForm';
import VideoPlayer from '@doorward/ui/components/VideoPlayer';
import Spacer from '@doorward/ui/components/Spacer';
import { useHistory } from 'react-router';

const ViewModuleVideo: React.FunctionComponent<ViewModuleVideoProps> = ({
  editing,
  item,
  module,
  ...props
}): JSX.Element => {
  const form = useForm();
  const history = useHistory();
  return (
    <div className="view-module-video">
      <EditableView
        isEditing={editing}
        creatorView={
          <AddModuleVideoForm
            useForm={form}
            module={module}
            onSuccess={props.onEditSuccess}
            video={item}
            onCancel={() => history.push(`/moduleItems/${item.id}`)}
          />
        }
        viewerView={
          <div>
            <VideoPlayer source={item.videoURL} />
            <Spacer />
            <Panel>{item.description}</Panel>
          </div>
        }
        creatorPrivileges={['moduleItems.create']}
        viewerPrivileges={['moduleItems.read']}
      />
    </div>
  );
};

export interface ViewModuleVideoProps {
  module: ModuleEntity;
  editing: boolean;
  item: ModuleVideoEntity;
  onEditSuccess: () => void;
}

export default ViewModuleVideo;
