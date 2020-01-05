import React, { useEffect, useState } from 'react';
import './ViewPages.scss';
import { Module, ModuleItem } from '../../../../../../libs/shared/models';
import EditableView from '../../../components/EditableView';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import DraftHTMLContent from '@edudoor/ui/src/components/DraftHTMLContent';
import { Roles } from '../../../../../../libs/ui/src/components/RolesManager';
import useRoutes from '../../../hooks/useRoutes';
import useForm from '@edudoor/ui/src/hooks/useForm';
import Pagination from '@edudoor/ui/src/components/Pagination';

const ViewPages: React.FunctionComponent<ViewPagesProps> = ({ editing, module, item, params }) => {
  const pages = module.items.filter((item: ModuleItem) => item.type === 'Page')
    .sort((a: ModuleItem, b: ModuleItem) => a.order - b.order);
  const page =  pages.findIndex((moduleItem: ModuleItem) => moduleItem.id === item.id) + 1;

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
            onSuccess={() => {}}
            onCancel={() => routes.navigate(routes.viewModuleItem, params)}
          />
        }
        viewerView={<DraftHTMLContent content={item.content} />}
        creator={[Roles.TEACHER]}
        viewer={[Roles.STUDENT]}
      />
      <Pagination page={page} numPages={pages.length} onChangePage={(page) => {
        routes.navigate(editing ? routes.editModuleItem : routes.viewModuleItem, {...params, itemId: pages[page - 1].id});
      }}/>
    </div>
  );
};

export interface ViewPagesProps {
  module: Module;
  editing: boolean;
  params: { [name: string]: string | undefined };
  item: ModuleItem;
}

export default ViewPages;
