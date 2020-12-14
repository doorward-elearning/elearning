import React from 'react';
import EditableView from '../../../components/EditableView';
import Panel from '@doorward/ui/components/Panel';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';
import useForm from '@doorward/ui/hooks/useForm';
import AddModuleVideoForm from '../../../components/Forms/AddModuleVideoForm';
import useRoutes from '../../../hooks/useRoutes';
import VideoPlayer from '@doorward/ui/components/VideoPlayer';
import Spacer from '@doorward/ui/components/Spacer';

const ViewModuleVideo: React.FunctionComponent<ViewModuleVideoProps> = ({
  editing,
  item,
  params,
  module,
  ...props
}): JSX.Element => {
  const form = useForm();
  const routes = useRoutes();
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
            onCancel={() => routes.navigate(routes.viewModuleItem, params)}
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
  params: { [name: string]: string | undefined };
  item: ModuleVideoEntity;
  onEditSuccess: () => void;
}

export default ViewModuleVideo;
