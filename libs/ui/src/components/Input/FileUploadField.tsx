import React, { useEffect, useRef, useState } from 'react';
import './styles/FileUploadField.scss';
import withInput, { InputFeatures } from '@doorward/ui/components/Input/index';
import IfElse from '@doorward/ui/components/IfElse';
import { InputProps } from './index';
import Panel from '@doorward/ui/components/Panel';
import Tools from '@doorward/common/utils/Tools';
import Icon from '@doorward/ui/components/Icon';
import ProgressBar from '@doorward/ui/components/ProgressBar';
import classNames from 'classnames';
import Spinner from '@doorward/ui/components/Spinner';
import MoreInfo from '@doorward/ui/components/MoreInfo';
import translate from '@doorward/common/lang/translate';
import { FileResponse, FilesResponse, SimpleFileResponse } from '@doorward/common/dtos/response';
import { AxiosResponse } from 'axios';
import { FileDrop } from 'react-file-drop';
import ImageFileRender from '@doorward/ui/components/Files/ImageFileRender';
import Button from '@doorward/ui/components/Buttons/Button';
import Row from '@doorward/ui/components/Row';
import Draggable from 'react-draggable';

type PreviewRenderer = Record<string, React.ComponentType<{ source: string }>>;

type FileUploadStatus = 'idle' | 'uploading' | 'uploaded' | 'failed';

const defaultRenderer = {
  'image/*': ImageFileRender,
};

const getFileId = (file: File) => {
  return file.name + file.size + file.lastModified;
};

const fileRenderer = (renderer?: PreviewRenderer) => (type: string, source?: string) => {
  const key = renderer ? Object.keys(renderer).find((_type) => new RegExp(_type.replace('*', '.*')).test(type)) : null;
  const Renderer = renderer[key];
  if (Renderer && source) {
    return <Renderer source={source} />;
  }
};

const ChosenFile: React.FunctionComponent<ChosenFileProps> = (props): JSX.Element => {
  const [status, setStatus] = useState<FileUploadStatus>('uploading');
  const { file } = props;
  const [percentage, setPercentage] = useState(0);
  const [cancelFunction, setCancelFunction] = useState(() => () => {});
  const [error, setError] = useState('');
  const [result, setResult] = useState<FileResponse>(null);

  const validate = () => {
    if (file.size > +process.env.MAX_UPLOAD_SIZE * 1024 * 1024) {
      setError(translate('maxFileSize', { size: Tools.fileSize(+process.env.MAX_UPLOAD_SIZE * 1024 * 1024) }));
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (status === 'uploading') {
      if (validate()) {
        props
          .uploadHandler(file, setPercentage, (cancelFunction) => {
            setCancelFunction(() => cancelFunction);
          })
          .then((result) => {
            setPercentage(100);
            setStatus('uploaded');
            props.onSuccess(result.data);
            setResult(result.data);
          })
          .catch((err) => {
            setStatus('failed');
            setError(translate('errorUploadingFile'));
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
          <span className="file-preview">{props.renderer(file.type, result?.file?.publicUrl)}</span>
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

const FileUploadField: React.FunctionComponent<FileUploadFieldProps & { isButton?: boolean }> = (
  props
): JSX.Element => {
  const maxFiles = props.multiple ? props.maxFiles || 10 : 1;
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState<Record<string, SimpleFileResponse>>({});
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const result = Object.values(value).filter((v) => !!v);
    let _value = null;

    if (props.multiple) {
      _value = result.map((file) => file[props.valueField || 'id']);
      if (props.onFilesChanged) {
        props.onFilesChanged(result);
      }
    } else {
      _value = result?.[0]?.[props.valueField || 'id'];
      if (props.onFileChanged) {
        props.onFileChanged(result?.[0]);
      }
    }

    props.onChange({
      target: {
        value: _value,
        name: props.name,
      },
    });
  }, [value]);

  const onChooseFile = (_files) => {
    if (_files?.length) {
      const newFiles = [..._files];
      let existing = files;
      existing = existing.filter((file) => !newFiles.find((aFile) => Tools.compareFiles(aFile, file)));
      setFiles([...existing, ...newFiles]);
      inputRef.current.value = null;
    }
  };

  const maxFilesUploaded = Object.values(files).filter((v) => !!v).length < maxFiles;

  return (
    <div className="ed-file-upload-field">
      <React.Fragment>
        <input
          type="file"
          accept={(props.fileTypes || []).join(',')}
          multiple={props.multiple}
          onChange={(e) => onChooseFile({ ...e }.target.files)}
          style={{ visibility: 'hidden' }}
          ref={inputRef}
        />
        {props.isButton ? (
          <Button
            type={'button'}
            icon={'cloud_upload'}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            {props.label || translate('uploadLabel')}
          </Button>
        ) : (
          <div>
            {maxFilesUploaded && (
              <React.Fragment>
                <FileDrop
                  onDragOver={() => setDragOver(true)}
                  onDragLeave={(e) => setDragOver(false)}
                  onDrop={(files: any, event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    let result: any = [...files].filter((file) => {
                      return (
                        !props.fileTypes ||
                        props.fileTypes.find((type) => new RegExp(type.replace('*', '.*')).test(file.type))
                      );
                    });
                    if (result.length) {
                      if (!props.multiple) {
                        result = result?.length ? [result[0]] : null;
                      }
                      onChooseFile(result);
                    }
                    setDragOver(false);
                  }}
                >
                  <div
                    className={classNames('upload-field', {
                      dragOver,
                    })}
                    onClick={() => {
                      inputRef.current && inputRef.current.click();
                    }}
                  >
                    <span>
                      {translate('dragAndDropFilesHere')} {translate('or')}{' '}
                      <span className="upload-field__browse">{translate('browse')}</span>
                    </span>
                  </div>
                </FileDrop>
                <div className="meta instructions">
                  <IfElse condition={maxFiles > 0}>
                    <span>{translate('uploadUpToWithCount', { count: maxFiles })}. &nbsp;</span>
                  </IfElse>
                  <span>{translate('maxFileSize', { size: `${process.env.MAX_UPLOAD_SIZE}MB` })}</span>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
      {files.length ? (
        <FileUploadProgress
          value={value}
          setValue={setValue}
          files={files}
          setFiles={setFiles}
          uploadHandler={props.uploadHandler}
          floating={props.isButton}
          previewRenderer={props.previewRenderer}
        />
      ) : null}
    </div>
  );
};

export const FileUploadProgress: React.FunctionComponent<FileUploadProgressProps> = ({
  files,
  value,
  setValue,
  setFiles,
  floating,
  ...props
}): JSX.Element => {
  const [showContent, setShowContent] = useState(true);
  const [numFailed, setNumFailed] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    setNumFailed(Object.keys(value).reduce((acc, cur) => acc + (value[cur] ? 0 : 1), 0));
  }, [value]);

  useEffect(() => {
    const uploading = files.find((file) => {
      const hasUploaded = Object.keys(value).find((fileId) => fileId === getFileId(file));
      return !hasUploaded;
    });
    setUploadComplete(!uploading);
  }, [value, files]);

  return (
    <Draggable handle=".selected-files-header">
      <div className={classNames('selected-files', { floating, showContent })}>
        {floating && (
          <div
            className="selected-files-header"
            onDoubleClick={() => {
              setShowContent(!showContent);
            }}
          >
            <span>
              {translate(
                uploadComplete
                  ? numFailed === 0
                    ? 'uploadCompleteTitle'
                    : 'uploadCompleteFailedTitle'
                  : 'uploadingItemsTitle',
                { count: files.length }
              )}
            </span>
            <Row>
              <Icon
                icon={showContent ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                onClick={() => setShowContent(!showContent)}
              />
              {uploadComplete && (
                <Icon
                  icon="close"
                  onClick={() => {
                    setFiles([]);
                  }}
                />
              )}
            </Row>
          </div>
        )}
        {files.map((file) => {
          const fileId = getFileId(file);
          return (
            <ChosenFile
              file={file}
              renderer={fileRenderer({ ...defaultRenderer, ...(props.previewRenderer || {}) })}
              uploadHandler={props.uploadHandler}
              onSuccess={(uploaded) => {
                setValue({
                  ...value,
                  [fileId]: uploaded.file,
                });
              }}
              onFailure={(error) => {
                setValue({
                  ...value,
                  [fileId]: undefined,
                });
              }}
              removeFile={() => {
                setFiles(files.filter((f) => !Tools.compareFiles(file, f)));
                setValue({ ...value, [fileId]: undefined });
              }}
              key={fileId}
            />
          );
        })}
      </div>
    </Draggable>
  );
};

export const FileUploadButton: React.FunctionComponent<FileUploadButtonProps> = (props): JSX.Element => {
  const [value, setValue] = useState<Array<SimpleFileResponse>>([]);
  const [updated, setUpdated] = useState<Record<string, SimpleFileResponse>>({});

  useEffect(() => {
    const _updated = { ...updated };

    value.forEach((file) => {
      if (!updated[file.id]) {
        props.onNewFileUploaded(file);
        _updated[file.id] = file;
      }
    });
    setUpdated(_updated);
  }, [value]);

  return <FileUploadField {...props} isButton onFilesChanged={setValue} onChange={() => {}} />;
};

interface FileUploadProgressProps {
  uploadHandler?: UploadHandler;
  value: Record<string, SimpleFileResponse>;
  setValue: (value: Record<string, SimpleFileResponse>) => void;
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  previewRenderer?: PreviewRenderer;
  floating?: boolean;
}

export type UploadHandler = (
  file: Blob,
  onUploadProgress: (percentage: number) => void,
  cancelHandler: (cancelFunction: () => void) => void
) => Promise<AxiosResponse<FileResponse>>;

export type MultipleUploadHandler = (
  file: Array<Blob>,
  onUploadProgress: (percentage: number) => void,
  cancelHandler: (cancelFunction: () => void) => void
) => Promise<FilesResponse>;

export type FileUploadFieldProps =
  | (InputProps & {
      fileTypes?: Array<string>;
      multiple?: false;
      onFileChanged?: (file: SimpleFileResponse) => void;
      valueField?: 'id' | 'publicUrl';
      uploadHandler?: UploadHandler;
      previewRenderer?: PreviewRenderer;
      label?: string;
    })
  | (InputProps & {
      maxFiles?: number;
      multiple?: true;
      fileTypes?: Array<string>;
      valueField?: 'id' | 'publicUrl';
      uploadHandler: UploadHandler;
      onFilesChanged?: (files: Array<SimpleFileResponse>) => void;
      previewRenderer?: PreviewRenderer;
      label?: string;
    });

export type FileUploadButtonProps = FileUploadFieldProps & {
  onNewFileUploaded: (file: SimpleFileResponse) => void;
};

export interface ChosenFileProps {
  file: File;
  removeFile: () => void;
  uploadHandler: UploadHandler;
  onSuccess: (file: FileResponse) => void;
  onFailure: (error: string) => void;
  renderer: (type: string, source: string) => JSX.Element | undefined;
}

export default withInput(FileUploadField, [InputFeatures.LABEL], { labelPosition: 'top', multiple: false });
