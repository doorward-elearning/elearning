import React, { useRef } from 'react';
import './List.scss';
import Panel from '../Panel';

const List: React.FunctionComponent<ListProps> = props => {
  const list = useRef<HTMLUListElement>(null);
  if (list) {
    const { current } = list;
    if (current && current.parentElement) {
      if (current.parentElement.classList.contains('ed-list__item')) {
        current.parentElement.classList.add('no-border');
      }
      const computed = getComputedStyle(current);
      if (computed.border && computed.border.includes('solid')) {
        current.style.overflow = 'hidden';
      }
    }
  }
  return (
    <Panel className="ed-list">
      <ul ref={list}>{props.children}</ul>
    </Panel>
  );
};

export interface ListProps {}

export default List;
