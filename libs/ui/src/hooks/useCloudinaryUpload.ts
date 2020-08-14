import { useCallback, useState } from 'react';
import cloudinaryUpload from '@doorward/ui/services/cloudinary';

export interface UseCloudinaryUpload {
  cancelled: boolean;
  progress: number;
  publicUrl: string;
  cancel: () => void;
  error: string;
  upload: (file: Blob) => void;
  uploading: boolean;
}

const useCloudinaryUpload = (): UseCloudinaryUpload => {
  const [cancelled, setCancelled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [publicUrl, setPublicUrl] = useState(null);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(() => () => {});
  const [uploading, setUploading] = useState(false);

  const upload = useCallback((file: Blob) => {
    setUploading(true);
    setCancelled(false);
    setError(null);
    setPublicUrl(null);
    setProgress(0);
    cloudinaryUpload(
      file,
      percentage => {
        setProgress(percentage);
      },
      cancelFunction => {
        setCancel(() => () => {
          setCancelled(true);
          cancelFunction();
        });
      }
    )
      .then(result => {
        if (result.publicUrl) {
          setPublicUrl(result.publicUrl);
        } else {
          setError(result.error);
        }
        setUploading(false);
      })
      .catch(console.error);
  }, []);

  return {
    cancelled,
    progress,
    publicUrl,
    error,
    cancel,
    upload,
    uploading,
  };
};

export default useCloudinaryUpload;
