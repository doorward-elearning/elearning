import {
  LoginBody,
  RegisterBody,
  UpdateAccountBody,
  UpdateProfilePictureBody,
  UpdatePasswordBody,
  ResetPasswordBody,
  ForgotPasswordBody,
  CreateFileBody
} from '@doorward/common/dtos/body';
import ApiRequest from '@doorward/common/net/apiRequest';
import {
  LoginResponse,
  UserResponse,
  FileResponse,
  FilesResponse
} from '@doorward/common/dtos/response';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import handleApiError from '@doorward/common/net/handleApiError';
import axios, {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

const {
  GET,
  PUT,
  POST,
  DELETE
} = ApiRequest;

const ts = (defaultConfig ? : () => AxiosRequestConfig) => ({
  "auth": {
    login: (body: LoginBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < LoginResponse >> => {
      return POST(`/auth/login`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    register: (body: RegisterBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < LoginResponse >> => {
      return POST(`/auth/register`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getCurrentUser: (config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return GET(`/auth`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "files": {
    createFile: (body: CreateFileBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < FileResponse >> => {
      return POST(`/files`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getFiles: (config ? : AxiosRequestConfig): Promise < AxiosResponse < FilesResponse >> => {
      return GET(`/files`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    getFile: (fileId: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < FileResponse >> => {
      return GET(`/files/${fileId}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    uploadFile: async (
      file: Blob,
      onUploadProgress ? : (percentage: number) => void,
      cancelHandler ? : (cancelFunction: () => void) => void,
      config ? : AxiosRequestConfig
    ): Promise < AxiosResponse < FileResponse >> => {
      const formData = new FormData();

      formData.append('file', file);

      const result = await POST("/files/upload", formData, null, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelHandler(c);
        }),
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });

      return result;
    },
    uploadMultipleFiles: async (
      files: Array < Blob > ,
      onUploadProgress ? : (percentage: number) => void,
      cancelHandler ? : (cancelFunction: () => void) => void,
      config ? : AxiosRequestConfig
    ): Promise < AxiosResponse < FilesResponse >> => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

      const result = await POST("/files/upload/multiple", formData, null, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelHandler(c);
        }),
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });

      return result;
    },
  },
  "healthCheck": {
    healthCheck: (config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return GET(`/health-check`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  },
  "userProfile": {
    getUserProfile: (username: string, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return GET(`/users/profile/${username}`, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateAccountDetails: (body: UpdateAccountBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return PUT(`/users/profile/account`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateAccountProfilePicture: (body: UpdateProfilePictureBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < UserResponse >> => {
      return PUT(`/users/profile/account/profilePicture`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    updateAccountPassword: (body: UpdatePasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return PUT(`/users/profile/password`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    resetAccountPassword: (body: ResetPasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/users/profile/resetPassword`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
    forgotAccountPassword: (body: ForgotPasswordBody, config ? : AxiosRequestConfig): Promise < AxiosResponse < DApiResponse >> => {
      return POST(`/users/profile/forgotPassword`, body, {}, {
        ...(config || {}),
        ...(defaultConfig && defaultConfig())
      });
    },
  }
})

export default ts;