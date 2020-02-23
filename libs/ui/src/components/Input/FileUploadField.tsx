import React, { useRef } from 'react';
import './styles/FileUploadField.scss';
import withInput, { InputFeatures } from '@edudoor/ui/components/Input/index';
import IfElse from '@edudoor/ui/components/IfElse';
import Plural from '@edudoor/ui/components/Plural';

const FileUploadField: React.FunctionComponent<FileUploadFieldProps> = (props): JSX.Element => {
  const maxFiles = props.maxFiles || (props.multiple ? null : 1);
  const inputRef = useRef(null);

  const onChooseFile = e => {
    console.log(e.target.value);
  };
  return (
    <div className="ed-file-upload-field">
      <input
        type="file"
        multiple={props.multiple}
        onChange={onChooseFile}
        style={{ visibility: 'hidden' }}
        ref={inputRef}
      />
      <div
        className="upload-field"
        onClick={() => {
          inputRef.current && inputRef.current.click();
        }}
      >
        <span>
          Drag and drop files here or <span className="upload-field__browse">Browse</span>
        </span>
      </div>
      <div className="meta instructions">
        <IfElse condition={maxFiles > 0}>
          <span>
            Upload upto <Plural singular="file" count={maxFiles} />.
          </span>
        </IfElse>
        <span> Max file size: {process.env.MAX_UPLOAD_SIZE}MB</span>
      </div>
    </div>
  );
};

export interface FileUploadFieldProps {
  maxFiles?: number;
  multiple?: boolean;
}

export default withInput(FileUploadField, [InputFeatures.LABEL], { labelPosition: 'top' });
