import React, { useRef } from 'react';
import './List.scss';

const List: React.FunctionComponent<ListProps> = props => {
  const list = useRef<HTMLUListElement>(null);
  if (list) {
    const { current } = list;
    if (current && current.parentElement) {
      if (current.parentElement.classList.contains('ed-list__item')) {
        current.parentElement.classList.add('no-border');
      }
    }
  }
  return (
    <ul className="ed-list" ref={list}>
      {props.children}
    </ul>
  );
};

export interface ListProps {}

export default List;
