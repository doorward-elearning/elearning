import React, { useEffect, useMemo, useState } from 'react';
import objectHash from 'object-hash';
import IfElse from '../IfElse';
import Tools from '@edudoor/frontend/src/utils/Tools';

function ItemArray<T>(props: ArrayProps<T>): JSX.Element {
  const [data, setData] = useState<Array<T>>([]);
  const getKey = props.getKey || ((item: any) => item.id);
  useEffect(() => {
    setData(props.data || []);
    if (props.count) {
      setData(Array(props.count).fill(0));
    }
  }, [props.data, props.count]);

  useEffect(() => {
    if (props.data) {
      let newData = [...(props.data || [])];
      if (props.max !== undefined) {
        const max = props.max;
        newData = newData.filter((i, index) => index < max);
      }
      if (props.sort) {
        newData = newData.sort(props.sort);
      }
      setData(newData);
    }
  }, [props.data]);

  return (
    <IfElse condition={data}>
      <React.Fragment>
        {data.map((item, index) => {
          return (
            <React.Fragment key={getKey(item)}>{props.children(item, index)}</React.Fragment>
          );
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
  count?: number;
  sort?: (a: T, b: T) => number;
  getKey?: (item: T) => string;
}

export default ItemArray;
