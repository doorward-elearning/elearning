import axios from 'axios';

export interface CloudinaryFileUploadResponse {
  publicUrl?: string;
  error?: string;
  fileName?: string;
}

const cloudinaryUpload = async (
  file: Blob,
  onUploadProgress?: (percentage: number) => void,
  cancelHandler?: (cancelFunction: () => void) => void
): Promise<CloudinaryFileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

  const url = process.env.CLOUDINARY_UPLOAD_URL;

  try {
    const { data: result }: any = await axios.post(url, formData, {
      onUploadProgress: progressEvent => {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onUploadProgress) {
          onUploadProgress(percentage);
        }
      },
      cancelToken: new axios.CancelToken(c => {
        cancelHandler(c);
      }),
    });

    return {
      publicUrl: result.secure_url,
      fileName: result.original_filename,
    };
  } catch (err) {
    return {
      error: err.toString(),
    };
  }
};

export default cloudinaryUpload;
