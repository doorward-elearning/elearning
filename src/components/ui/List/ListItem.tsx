import React from 'react';

const ListItem: React.FunctionComponent<ListItemProps> = props => {
  return <li className="ed-list__item">{props.children}</li>;
};

export interface ListItemProps {}

export default ListItem;
