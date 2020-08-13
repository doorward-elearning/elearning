import React, { useEffect, useRef, useState } from 'react';
import profile from '../../../assets/images/placeholder.png';
import './styles/ProfilePicture.scss';
import Icon from '@doorward/ui/components/Icon';
import useCloudinaryUpload from '../../hooks/useCloudinaryUpload';
import classNames from 'classnames';
import { CircularProgressbar } from 'react-circular-progressbar';
import withInput, { InputFeatures, InputProps } from '@doorward/ui/components/Input/index';

const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (props): JSX.Element => {
  const [value, setValue] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const inputRef = useRef<HTMLInputElement>();
  const [placeholder, setPlaceholder] = useState<string | ArrayBuffer>(profile);

  const { upload, uploading, publicUrl, error, cancel, progress, cancelled } = useCloudinaryUpload();

  useEffect(() => {
    if (currentFile) {
      props.formikProps.setTouched({ [props.name]: false });
      upload(currentFile);
    }
  }, [currentFile]);

  useEffect(() => {
    if (inputRef.current) {
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
        <img src={placeholder as string} />
        {uploading && <div className="mask" />}
        {(uploading || publicUrl || cancelled) && (
          <CircularProgressbar strokeWidth={2} value={progress} minValue={0} maxValue={100} />
        )}
        {!uploading && (
          <span className="icon-container edit-icon">
            <Icon
              icon="edit"
              clickable
              onClick={() => {
                if (inputRef.current) {
                  props.onBlur({ target: { ...inputRef.current, name: props.name } });
                  inputRef.current.click();
                }
              }}
            />
          </span>
        )}
        {uploading && (
          <span className="icon-container cancel-icon">
            <Icon icon="close" onClick={cancel} />
          </span>
        )}
        {cancelled && (
          <span className="icon-container retry-icon">
            <Icon
              icon="redo"
              onClick={() => {
                upload(currentFile);
              }}
            />
          </span>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={e => {
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
export interface ProfilePictureProps extends InputProps {}

export default withInput(ProfilePicture, [InputFeatures.LABEL], { labelPosition: 'top' });
