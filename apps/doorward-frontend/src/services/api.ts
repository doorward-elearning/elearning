import ApiRequest from '@doorward/ui/services/apiRequest';
import axios from 'axios';

/**
 * Use the return keyword in the functions to improve readability
 */

const { GET, PUT, POST, DELETE } = ApiRequest;

const Api = {
  fileURL: (fileId: string, publicFile = false) =>
    `${process.env.REACT_APP_BASE_URL}/storage${publicFile ? '/public' : ''}/files/${fileId}`,
  storage: {
    upload: (
      file: Blob,
      publicFile?: boolean,
      onUploadProgress?: (percentage: number) => void,
      cancelHandler?: (cancelFunction: () => void) => void
    ): Promise<any> => {
      const formData = new FormData();
      formData.append('file', file);

      const url = publicFile ? '/storage/public/upload' : '/storage/upload';
      return POST(url, formData, null, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelHandler(c);
        }),
      });
    },
    getFile: (fileId: string) => {
      return GET('/storage/files/' + fileId);
    },
  },
};

export default Api;
