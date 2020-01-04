import { useEffect } from 'react';
import toast from '@edudoor/frontend/src/utils/toast';

const useOfflineToast = () => {
  useEffect(() => {
    const eventListener = () => {
      toast.show({
        message: 'You are offline. You may not be able to access some of the features.',
        timeout: -1,
        hPosition: 'left',
        vPosition: 'bottom',
        type: 'error',
        static: true,
      });
    };
    window.addEventListener('offline', eventListener);
    return () => window.removeEventListener('offline', eventListener);
  }, []);


  useEffect(() => {
    const eventListener = () => {
      toast.clear().then();
    };
    window.addEventListener('online', eventListener);
    return () => window.removeEventListener('online', eventListener);
  }, []);
};

export default useOfflineToast;
