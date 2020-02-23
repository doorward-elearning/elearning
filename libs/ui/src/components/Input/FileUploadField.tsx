import React from 'react';
import './styles/FileUploadField.scss';

const FileUploadField: React.FunctionComponent<FileUploadFieldProps> = (props): JSX.Element => {
  return (
    <div className="ed-file-upload-field"></div>
  );
};

export interface FileUploadFieldProps {
}

export default FileUploadField;
