import React, { useEffect, useState } from 'react';
import objectHash from 'object-hash';
import IfElse from '../IfElse';

function ItemArray<T>(props: ArrayProps<T>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);
  useEffect(() => {
    setData(props.data || []);
  }, [props.data]);

  useEffect(() => {
    let newData = [...(props.data || [])];
    if (props.max !== undefined) {
      const max = props.max;
      newData = newData.filter((i, index) => index < max);
    }
    if (props.sort) {
      newData = newData.sort(props.sort);
    }
    setData(newData);
  }, [props.data]);

  return (
    <IfElse condition={data}>
      <React.Fragment>
        {data.map((item, index) => {
          return <React.Fragment key={objectHash(item).substr(0, 10)}>{props.children(item, index)}</React.Fragment>;
        })}
      </React.Fragment>
      <IfElse condition={props.empty}>
        <React.Fragment>{props.empty}</React.Fragment>
      </IfElse>
    </IfElse>
  );
}

export interface ArrayProps<T> {
  data?: Array<T>;
  empty?: JSX.Element;
  children: (item: T, index: number) => JSX.Element;
  max?: number;
  sort?: (a: T, b: T) => number;
}

export default ItemArray;
