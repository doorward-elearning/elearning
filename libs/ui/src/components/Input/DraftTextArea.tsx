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
              root_name: name,
              min_height: 300,
              toolbar_mode: 'floating',
              plugins:
                ' advcode casechange formatpainter  autolink lists checklist media fullscreen' +
                ' mediaembed pageembed permanentpen powerpaste table advtable tiny_mce_wiris',
              toolbar:
                'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify |' +
                ' outdent indent | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | fullscreen',
              external_plugins: {
                tiny_mce_wiris: '/assets/js/wiris.plugin.min.js',
              },
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
