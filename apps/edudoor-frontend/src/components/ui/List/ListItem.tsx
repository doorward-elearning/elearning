import React, { MouseEventHandler } from 'react';

const ListItem: React.FunctionComponent<ListItemProps> = props => {
  return (
    <li className="ed-list__item" onClick={props.onClick}>
      {props.children}
    </li>
  );
};

export interface ListItemProps {
  onClick?: MouseEventHandler;
}

export default ListItem;
