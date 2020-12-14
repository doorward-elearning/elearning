import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

const ListItem: React.FunctionComponent<ListItemProps> = (props) => {
  return (
    <li
      className={classNames({
        'ed-list__item': true,
        [props.className || '']: true,
        clickable: !!props.onClick,
        selected: props.selected,
      })}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
};

export interface ListItemProps {
  onClick?: MouseEventHandler;
  className?: string;
  selected?: boolean;
}

export default ListItem;
