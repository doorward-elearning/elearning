import React from 'react';
import IfElse from '../IfElse';

function ItemArray<T>(props: ArrayProps<T>): JSX.Element {
  const data = props.data || [];
  return (
    <IfElse condition={data}>
      <React.Fragment>
        {data.map((item, index) => (
          <React.Fragment key={index}>{props.children(item, index)}</React.Fragment>
        ))}
      </React.Fragment>
      <IfElse condition={props.empty}>
        <React.Fragment>{props.empty}</React.Fragment>
      </IfElse>
    </IfElse>
  );
}

export interface ArrayProps<T> {
  data: Array<T>;
  empty?: JSX.Element;
  children: (item: T, index: number) => JSX.Element;
}

export default ItemArray;
