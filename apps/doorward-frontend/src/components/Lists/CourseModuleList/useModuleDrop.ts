import { DropResult } from 'react-beautiful-dnd';
import Tools from '@doorward/common/utils/Tools';
import { ActionCreator } from '@doorward/ui/reducers/reducers';
import ModuleModel from '@doorward/common/models/module.model';

export type HandleDrop = (dropResult: DropResult, items: Array<ModuleModel>) => Array<ModuleModel>;

function useModuleDrop(courseId: string, action: ActionCreator): [HandleDrop] {
  const handleDrop = (dropResult: DropResult, items: Array<ModuleModel>) => {
    let updatedModules: any = items;
    if (dropResult.type === 'MODULES') {
      updatedModules = Tools.handleReorder(items, 'id', dropResult);
    } else {
      const newItems = [...items];
      if (dropResult.destination) {
        const sourceModule = newItems.findIndex((m) => m.id === dropResult.source.droppableId);
        const destinationModule = newItems.findIndex((m) => m.id === '' + dropResult.destination?.droppableId);

        const moduleItem = newItems[sourceModule].items.find((item) => item.id === dropResult.draggableId);

        if (sourceModule === destinationModule) {
          const module = newItems[sourceModule];
          module.items = Tools.handleReorder(module.items, 'id', dropResult);
          newItems[sourceModule] = module;
        } else {
          newItems[sourceModule].items = newItems[sourceModule].items.filter(
            (item) => item.id !== dropResult.draggableId
          );
          if (moduleItem) {
            newItems[destinationModule].items.splice(dropResult.destination.index, 0, moduleItem);
          }
        }
      }
      updatedModules = newItems;
    }
    updatedModules = updatedModules.map((module, index) => ({
      ...module,
      items: module.items.map((item, moduleItemIndex) => ({ ...item, order: moduleItemIndex })),
      order: index,
    }));
    action({ modules: updatedModules });
    return updatedModules;
  };
  return [handleDrop];
}

export default useModuleDrop;
