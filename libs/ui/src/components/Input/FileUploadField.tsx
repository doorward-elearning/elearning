import React, { useEffect, useRef, useState } from 'react';
import './styles/FileUploadField.scss';
import withInput, { InputFeatures } from '@edudoor/ui/components/Input/index';
import IfElse from '@edudoor/ui/components/IfElse';
import Plural from '@edudoor/ui/components/Plural';
import { InputProps } from './index';
import Panel from '@edudoor/ui/components/Panel';
import Tools from '@edudoor/common/utils/Tools';
import Icon from '@edudoor/ui/components/Icon';
import ProgressBar from '@edudoor/ui/components/ProgressBar';
import classNames from 'classnames';
import Spinner from '@edudoor/ui/components/Spinner';
import MoreInfo from '@edudoor/ui/components/MoreInfo';
import { File as FileModel } from '@edudoor/common/models/File';

const ChosenFile: React.FunctionComponent<ChosenFileProps> = (props): JSX.Element => {
  const [status, setStatus] = useState<'uploading' | 'uploaded' | 'failed'>('uploading');
  const { file } = props;
  const [percentage, setPercentage] = useState(0);
  const [cancelFunction, setCancelFunction] = useState(() => () => {});
  const [error, setError] = useState('');

  const validate = () => {
    if (file.size > +process.env.MAX_UPLOAD_SIZE * 1024 * 1024) {
      setError('Max file size is: ' + Tools.fileSize(+process.env.MAX_UPLOAD_SIZE * 1024 * 1024));
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (status === 'uploading') {
      if (validate()) {
        props
          .uploadHandler(file, setPercentage, cancelFunction => {
            setCancelFunction(() => cancelFunction);
          })
          .then(result => {
            setPercentage(100);
            setStatus('uploaded');
            props.onSuccess(result.data.file);
          })
          .catch(err => {
            setStatus('failed');
            setError('Error uploading file. Please try again.');
            props.onFailure(error);
          });
      } else {
        setStatus('failed');
      }
    }
  }, []);
  return (
    <div
      className={classNames({
        'chosen-file': true,
        [status]: true,
      })}
    >
      <Panel>
        <div className="chosen-file-content meta">
          <div>
            <IfElse condition={status === 'uploading'}>
              <Spinner width={20} height={20} />
            </IfElse>
            <IfElse condition={status === 'uploaded'}>
              <Icon icon="check" className="success" />
            </IfElse>
            <IfElse condition={status === 'failed'}>
              <MoreInfo info={error}>
                <Icon icon="error" className="error" />
              </MoreInfo>
            </IfElse>
          </div>
          <span className="file-name">{file.name}</span>
          <span>{Tools.fileSize(file.size)}</span>
          <Icon
            icon="close"
            onClick={() => {
              if (cancelFunction) {
                cancelFunction();
              }
              props.removeFile();
            }}
          />
        </div>
      </Panel>
      <IfElse condition={status === 'uploading'}>
        <ProgressBar size={1} progress={percentage / 100} indeterminate={false} />
      </IfElse>
    </div>
  );
};

const FileUploadField: React.FunctionComponent<FileUploadFieldProps> = (props): JSX.Element => {
  const maxFiles = props.maxFiles || (props.multiple ? Number.MAX_SAFE_INTEGER : 1);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState({});

  useEffect(() => {
    const result = Object.values(value).filter(v => !!v);

    props.onChange({
      target: {
        value: result,
        name: props.name,
      },
    });
  }, [value]);

  const onChooseFile = e => {
    if (e.target.files.length) {
      const newFiles = [...e.target.files];
      let existing = files;
      existing = existing.filter(file => !newFiles.find(aFile => Tools.compareFiles(aFile, file)));
      setFiles([...existing, ...newFiles]);
    }
  };
  return (
    <div className="ed-file-upload-field">
      {Object.values(value).filter(v => !!v).length < maxFiles && (
        <React.Fragment>
          <input
            type="file"
            accept={(props.fileTypes || []).join(',')}
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
        </React.Fragment>
      )}
      <div className="selected-files">
        {files.map(file => {
          const fileId = file.name + file.size + file.lastModified;
          return (
            <ChosenFile
              file={file}
              uploadHandler={props.uploadHandler}
              onSuccess={uploaded => {
                setValue({
                  ...value,
                  [fileId]: uploaded,
                });
              }}
              onFailure={error => {
                setValue({
                  ...value,
                  [fileId]: undefined,
                });
              }}
              removeFile={() => {
                setFiles(files.filter(f => !Tools.compareFiles(file, f)));
                setValue({ ...value, [fileId]: undefined });
              }}
              key={fileId}
            />
          );
        })}
      </div>
    </div>
  );
};

export type UploadHandler = (
  file: Blob,
  onUploadProgress: (percentage: number) => void,
  cancelHandler: (cancelFunction: () => void) => void
) => Promise<any>;

export type FileUploadFieldValue = Array<FileModel>;

export interface FileUploadFieldProps extends InputProps {
  maxFiles?: number;
  multiple?: boolean;
  fileTypes?: Array<string>;
  uploadHandler: UploadHandler;
}

export interface ChosenFileProps {
  file: File;
  removeFile: () => void;
  uploadHandler: UploadHandler;
  onSuccess: (file: FileModel) => void;
  onFailure: (error: string) => void;
}
export default withInput(FileUploadField, [InputFeatures.LABEL], { labelPosition: 'top' });
