import React, { ReactChild } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './DragAndDropList.scss';
import classNames from 'classnames';
import Icon from '../Icon';

function DragAndDropListItem(props: DragAndDropListItemProps): JSX.Element {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, { isDragging, draggingOver }) => {
        return (
          <div
            className={classNames({
              'drag-and-drop-list-item': true,
              dragging: isDragging,
              draggingOver,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div {...provided.dragHandleProps}>
              <Icon className="dragIndicator" icon="drag_indicator" />
            </div>
            <div className="draggable-content">{props.children}</div>
          </div>
        );
      }}
    </Draggable>
  );
}

export interface DragAndDropListItemProps {
  draggableId: any;
  index: number;
  children: Array<ReactChild> | ReactChild;
}

export default DragAndDropListItem;
