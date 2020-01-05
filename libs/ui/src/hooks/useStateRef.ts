import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

function useStateRef<T>(initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

export default useStateRef;
