import React from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import './styles/DraftTextArea.scss';
import classNames from 'classnames';
import { Editor } from '@tinymce/tinymce-react';
import HtmlContent from '@doorward/ui/components/HtmlContent';

const DraftTextArea: React.FunctionComponent<DraftTextAreaProps> = ({
  value = '',
  className,
  formikProps,
  children,
  name,
  ...props
}): JSX.Element => {
  return (
    <div
      className={classNames({
        [`${className} eb-input--draft-text-area`]: true,
        fluid: props.fluid,
      })}
    >
      <React.Fragment>
        {props.editable ? (
          <Editor
            apiKey={process.env.TINY_MCE_API_KEY}
            tagName={name}
            init={{
              width: '100%',
              // eslint-disable-next-line @typescript-eslint/camelcase
              root_name: name,
              // eslint-disable-next-line @typescript-eslint/camelcase
              min_height: 300,
            }}
            {...props}
            onBlur={(e) => {
              formikProps.handleBlur({ ...e, target: { ...e.target, name } });
            }}
            value={value}
            textareaName={name}
            onEditorChange={(value) => {
              props.onChange({
                target: {
                  value: value.trim(),
                  name,
                },
              });
            }}
          />
        ) : (
          <HtmlContent html={value} />
        )}
      </React.Fragment>
      {children}
    </div>
  );
};

export interface DraftTextAreaProps extends InputProps {
  shy?: boolean;
}

export default withInput(DraftTextArea, [InputFeatures.LABEL], {}, false);
