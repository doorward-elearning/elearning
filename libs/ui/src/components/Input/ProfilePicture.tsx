import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles/ProfilePicture.scss';
import Icon from '@doorward/ui/components/Icon';
import ProfilePictureDisplay, { ProfilePictureUser } from '@doorward/ui/components/ProfilePicture';
import classNames from 'classnames';
import { CircularProgressbar } from 'react-circular-progressbar';
import withInput, { InputFeatures, InputProps } from '@doorward/ui/components/Input/index';
import { UploadHandler } from '@doorward/ui/components/Input/FileUploadField';
import Spinner from '@doorward/ui/components/Spinner';

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (props): JSX.Element => {
  const [value, setValue] = useState(props.value);
  const [currentFile, setCurrentFile] = useState();
  const inputRef = useRef<HTMLInputElement>();
  const [placeholder, setPlaceholder] = useState<string | ArrayBuffer>(props.value);
  const [publicUrl, setPublicUrl] = useState();
  const [error, setError] = useState();
  const [cancelled, setCancelled] = useState(false);
  const [cancelFunction, setCancelFunction] = useState(() => () => {});
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(() => {
    if (currentFile) {
      setCancelled(false);
      setUploading(true);
      props
        .uploadHandler(
          currentFile,
          (percentage) => {
            setProgress(percentage);
          },
          (cancelFunction1) => setCancelFunction(() => cancelFunction1)
        )
        .then((result) => {
          setPublicUrl(result.data.file[props.valueField || 'publicUrl']);
          setValue(result.data.file[props.valueField || 'publicUrl']);
          setUploading(false);
          setProgress(100);
        })
        .catch((error) => {
          setError(error);
          setUploading(false);
          setProgress(100);
        });
    }
  }, [currentFile]);

  useEffect(() => {
    if (currentFile) {
      if (props.formikProps) {
        props.formikProps.setTouched({ [props.name]: false });
      }
      upload();
    }
  }, [currentFile, upload]);

  useEffect(() => {
    if (inputRef.current && value) {
      props.onChange({
        target: {
          ...inputRef.current,
          value,
          name: props.name,
        },
      });
    }
  }, [value]);

  useEffect(() => {
    if (publicUrl) {
      setValue(publicUrl);
    }
  }, [publicUrl]);
  return (
    <div
      className={classNames({
        'profile-picture-input': true,
        uploading,
        success: !!publicUrl,
        error: error || cancelled,
      })}
    >
      <div className="image-display">
        {placeholder ? (
          <img src={placeholder as string} />
        ) : (
          <ProfilePictureDisplay user={props.user} width={150} height={150} />
        )}
        {uploading && <div className="mask" />}
        {(uploading || publicUrl || cancelled) && (
          <React.Fragment>
            {progress === 100 && uploading ? (
              <Spinner width={100} height={100} />
            ) : (
              <CircularProgressbar strokeWidth={2} value={progress} minValue={0} maxValue={100} />
            )}
          </React.Fragment>
        )}
        {!uploading && (
          <span className="icon-container edit-icon">
            <Icon
              icon="edit"
              clickable
              onClick={() => {
                if (inputRef.current) {
                  if (props.onBlur) {
                    props.onBlur({ target: { ...inputRef.current, name: props.name } });
                  }
                  inputRef.current.click();
                }
              }}
            />
          </span>
        )}
        {uploading && (
          <span className="icon-container cancel-icon">
            <Icon
              icon="close"
              onClick={() => {
                setCancelled(true);
                cancelFunction();
              }}
            />
          </span>
        )}
        {cancelled && (
          <span className="icon-container retry-icon">
            <Icon
              icon="redo"
              onClick={() => {
                upload();
              }}
            />
          </span>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setPlaceholder(fileReader.result);
            setCurrentFile(file);
          };
          fileReader.readAsDataURL(file);
        }}
      />
    </div>
  );
};
export interface ProfilePictureProps extends InputProps {
  uploadHandler: UploadHandler;
  user: ProfilePictureUser;
  valueField?: 'id' | 'publicUrl';
}

export const BasicProfilePicture = ProfilePicture;

export default withInput(ProfilePicture, [InputFeatures.LABEL], { labelPosition: 'top' });
