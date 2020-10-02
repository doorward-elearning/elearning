import { useEffect } from 'react';

const usePromiseEffect = <T>(promise: Promise<T>, callback: (result: T, error?: any) => void, deps: any[]) => {
  return useEffect(() => {
    let isSubscribed = true;
    promise
      .then((result) => {
        if (isSubscribed) {
          callback(result);
        }
      })
      .catch((e) => {
        if (isSubscribed) {
          callback(null, e);
        }
      });

    return () => (isSubscribed = false);
  }, [...(deps || [])]);
};

export default usePromiseEffect;
