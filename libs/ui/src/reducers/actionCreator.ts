import { ActionCreator } from '@doorward/ui/reducers/reducers';

export default function<T extends any[]>(type: string): ActionCreator<T> {
  return (...args: T) => ({
    type,
    payload: [...args],
  });
}
