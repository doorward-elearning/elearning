import React, { useEffect, useState } from 'react';
import './DragAndDropList.scss';
import objectHash from 'object-hash';
import { DragDropContext, Droppable, DroppableStateSnapshot, DropResult } from 'react-beautiful-dnd';

function DragAndDropList<T>(props: DragAndDropListProps<T>): JSX.Element {
  const [items, setItems] = useState<Array<T>>([]);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  const onDragEnd = (dragResult: DropResult) => {
    const { destination, source, draggableId } = dragResult;
    if (!destination) {
      return;
    }
    if (items) {
      if (props.handleDrop) {
        setItems(props.handleDrop(dragResult, items));
      } else {
        const newItems = items.filter((item: T) => item[props.itemKey] !== (draggableId as any));
        newItems.splice(destination.index, 0, items[source.index]);
        setItems(newItems);
      }
    }
  };
  return (
    <div className="drag-and-drop-list">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable type={props.droppableType} droppableId={props.droppableId || objectHash(props.items).substr(0, 10)}>
          {(provided, state) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.children(items, state)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export interface DragAndDropListProps<T> {
  items: Array<T>;
  children: (items: Array<T>, droppableState: DroppableStateSnapshot) => JSX.Element;
  itemKey: keyof T;
  droppableId?: string;
  handleDrop?: (dragResult: DropResult, items: Array<T>) => Array<T>;
  droppableType?: string;
  disabled?: boolean;
}

export default DragAndDropList;
