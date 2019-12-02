import React, { useEffect, useState } from 'react';
import './DragAndDropList.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

function DragAndDropList<T>(props: DragAndDropListProps<T>): JSX.Element {
  const [items, setItems] = useState<Array<T>>([]);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="1">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.children(items)}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export interface DragAndDropListProps<T> {
  items: Array<T>;
  children: (items: Array<T>) => JSX.Element;
  itemKey: keyof T;
}

export default DragAndDropList;
