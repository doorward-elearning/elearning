import React from 'react';
import './ViewPages.scss';
import EditableView from '../../../components/EditableView';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import useRoutes from '../../../hooks/useRoutes';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import useForm from '@doorward/ui/hooks/useForm';
import Panel from '@doorward/ui/components/Panel';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';

const ViewPages: React.FunctionComponent<ViewPagesProps> = ({ editing, module, item, params, ...props }) => {
  const routes = useRoutes();
  const form = useForm();
  return (
    <div className="view-module-pages">
      <EditableView
        isEditing={editing}
        creatorView={
          <AddModulePageForm
            useForm={form}
            module={module}
            page={item}
            onSuccess={props.onEditSuccess}
            onCancel={() => routes.navigate(routes.viewModuleItem, params)}
          />
        }
        viewerView={
          <div>
            <Panel>
              <DraftHTMLContent content={item.page} />
            </Panel>
          </div>
        }
        creatorPrivileges={['moduleItems.create']}
        viewerPrivileges={['moduleItems.read']}
      />
    </div>
  );
};

export interface ViewPagesProps {
  module: ModuleEntity;
  editing: boolean;
  params: { [name: string]: string | undefined };
  item: PageEntity;
  onEditSuccess: () => void;
}

export default ViewPages;
