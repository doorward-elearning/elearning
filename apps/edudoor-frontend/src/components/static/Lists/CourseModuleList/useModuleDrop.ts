import { DropResult } from 'react-beautiful-dnd';
import { Module } from '../../../../services/models';
import Tools from '../../../../utils/Tools';
import { ActionCreator } from '../../../../reducers/reducers';

export type HandleDrop = (dropResult: DropResult, items: Array<Module>) => Array<Module>;

function useModuleDrop(courseId: string, action: ActionCreator): [HandleDrop] {
  const handleDrop = (dropResult: DropResult, items: Array<Module>) => {
    let updatedModules = items;
    if (dropResult.type === 'MODULES') {
      updatedModules = Tools.handleReorder(items, 'id', dropResult);
    } else {
      const newItems = [...items];
      if (dropResult.destination) {
        const sourceModule = newItems.findIndex(m => m.id === dropResult.source.droppableId);
        const destinationModule = newItems.findIndex(m => m.id === dropResult.destination?.droppableId);

        const moduleItem = newItems[sourceModule].items.find(item => item.id === dropResult.draggableId);

        if (sourceModule === destinationModule) {
          const module = newItems[sourceModule];
          module.items = Tools.handleReorder(module.items, 'id', dropResult);
          newItems[sourceModule] = module;
        } else {
          newItems[sourceModule].items = newItems[sourceModule].items.filter(
            item => item.id !== dropResult.draggableId
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
    action(courseId, { modules: updatedModules });
    return updatedModules;
  };
  return [handleDrop];
}

export default useModuleDrop;
