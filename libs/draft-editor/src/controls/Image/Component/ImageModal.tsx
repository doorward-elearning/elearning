import React, { MouseEventHandler } from 'react';
import Form from '@doorward/ui/components/Form';
import { UseForm } from '@doorward/ui/hooks/useForm';
import FileUploadField, { UploadHandler } from '@doorward/ui/components/Input/FileUploadField';
import TextField from '@doorward/ui/components/Input/TextField';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import { FormikProps } from 'formik';
import validation from './validation';

interface UploadImageFormValues {
  imgSrc: string;
  alt?: string;
  height: string;
  width: string;
}

export interface ImageModalProps {
  form: UseForm<UploadImageFormValues>;
  onSubmit: (values: UploadImageFormValues) => void;
  initialValues: Partial<UploadImageFormValues>;
  uploadEnabled: boolean;
  translations: any;
  uploadCallback?: UploadHandler;
  urlEnabled?: boolean;
  previewImage?: boolean;
  inputAccept: string;
  altConf?: {
    mandatory?: boolean;
    present?: boolean;
  };
}

const ImageModal: React.FunctionComponent<ImageModalProps> = ({
  translations,
  previewImage,
  inputAccept,
  altConf,
  ...props
}): JSX.Element => {
  return (
    <Form form={props.form} initialValues={props.initialValues} onSubmit={props.onSubmit} validationSchema={validation}>
      {(formikProps: FormikProps<UploadImageFormValues>) => {
        return (
          <React.Fragment>
            <TabLayout>
              {props.uploadEnabled && props.uploadCallback && (
                <Tab title={translations('components_controls_image_fileUpload')}>
                  <FileUploadField
                    name="imgSrc"
                    uploadHandler={props.uploadCallback}
                    valueField="publicUrl"
                    placeholder={translations('components_controls_image_dropFileText')}
                    fileTypes={inputAccept.split(',') || ['image/*']}
                  />
                </Tab>
              )}
              {props.urlEnabled && (
                <Tab title={translations('components_controls_image_byURL')}>
                  <div className="rdw-image-modal-url-section">
                    <TextField name="imgSrc" placeholder={translations('components_controls_image_byURL')} />
                  </div>
                </Tab>
              )}
            </TabLayout>
            {previewImage && formikProps?.values?.imgSrc && (
              <img
                src={formikProps?.values?.imgSrc}
                alt={formikProps?.values?.alt}
                className="rdw-image-modal-upload-option-image-preview"
              />
            )}
            <div>
              {altConf.present && (
                <div className="rdw-image-modal-size">
                  <TextField name="alt" placeholder={translations('components_controls_image_altText')} />
                </div>
              )}
              <div className="rdw-image-modal-size">
                <TextField name="height" placeholder={translations('components_controls_image_height')} />
                <TextField name="width" placeholder={translations('components_controls_image_width')} />
              </div>
            </div>
          </React.Fragment>
        );
      }}
    </Form>
  );
};

export default ImageModal;
