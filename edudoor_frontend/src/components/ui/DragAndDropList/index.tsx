import React, { useState } from 'react';
import './DragAndDropList.scss';
import objectHash from 'object-hash';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

function DragAndDropList<T>(props: DragAndDropListProps<T>): JSX.Element {
  const [items, setItems] = useState<Array<T>>(props.items);

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) {
      return;
    }
    if (source.index == destination.index) {
      return;
    }
    if (items) {
      const newItems = items.filter((item: T) => item[props.itemKey] !== (draggableId as any));
      newItems.splice(destination.index, 0, items[source.index]);
      setItems(newItems);
    }
  };
  return (
    <div className="drag-and-drop-list">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={props.droppableId || objectHash(props.items).substr(0, 10)}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.children(items)}
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
  children: (items: Array<T>) => JSX.Element;
  itemKey: keyof T;
  droppableId?: string;
}

export default DragAndDropList;
