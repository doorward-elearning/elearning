import React, { useEffect, useState } from 'react';
import './ViewPages.scss';
import EditableView from '../../../components/EditableView';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import useRoutes from '../../../hooks/useRoutes';
import Pagination from '@doorward/ui/components/Pagination';
import DraftHTMLContent from '@doorward/ui/components/DraftHTMLContent';
import { Roles } from '@doorward/ui/components/RolesManager';
import useForm from '@doorward/ui/hooks/useForm';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import Panel from '@doorward/ui/components/Panel';

const ViewPages: React.FunctionComponent<ViewPagesProps> = ({ editing, module, item, params, ...props }) => {
  const [pages] = useState(
    module.items
      .filter((item: ModuleItem) => item.type === 'Page')
      .sort((a: ModuleItem, b: ModuleItem) => a.order - b.order)
  );
  const [page, setPage] = useState();

  useEffect(() => {
    if (item) {
      setPage(pages.findIndex((moduleItem: ModuleItem) => moduleItem.id === item.id) + 1);
    }
  }, [item]);

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
              <DraftHTMLContent content={item.content} />
            </Panel>
          </div>
        }
        creator={[Roles.MODERATOR]}
        viewer={[Roles.MEMBER]}
      />
      {page > 0 && (
        <Pagination
          page={page}
          numPages={pages.length}
          onChangePage={page => {
            routes.navigate(editing ? routes.editModuleItem : routes.viewModuleItem, {
              ...params,
              itemId: pages[page - 1].id,
            });
          }}
        />
      )}
    </div>
  );
};

export interface ViewPagesProps {
  module: Module;
  editing: boolean;
  params: { [name: string]: string | undefined };
  item: ModuleItem;
  onEditSuccess: () => void;
}

export default ViewPages;