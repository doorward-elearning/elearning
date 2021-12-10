import React from 'react';
import './ViewPages.scss';
import EditableView from '../../../components/EditableView';
import AddModulePageForm from '../../../components/Forms/AddModulePageForm';
import HTMLContentView from '@doorward/ui/components/HTMLContentView';
import useForm from '@doorward/ui/hooks/useForm';
import Panel from '@doorward/ui/components/Panel';
import ModuleEntity from '@doorward/common/entities/module.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import PDFViewer from '@doorward/ui/components/PDFViewer';

const ViewPages: React.FunctionComponent<ViewPagesProps> = ({ editing, module, item, ...props }) => {
  const form = useForm();
  const navigation = useNavigation();
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
            onCancel={() => navigation.navigate(ROUTES.courses.modules.items.update, { itemId: item.id })}
          />
        }
        viewerView={
          <div>
            {item.files?.length ? (
              <div className={'view-module-pages__pdfs'}>
                {item.files.map((file) => (
                  <PDFViewer file={file.publicUrl} title={file.name} />
                ))}
              </div>
            ) : (
              <Panel>
                <HTMLContentView content={item.page} />
              </Panel>
            )}
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
  item: PageEntity;
  onEditSuccess: () => void;
}

export default ViewPages;
