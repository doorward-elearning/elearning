import React from 'react';
import Icon from '../Icon';
import './styles/TextField.scss';
import withInput, { InputFeatures, InputProps } from './index';
import { Icons } from '../../../types/icons';

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  value = '',
  className,
  children,
  icon,
  ...props
}): JSX.Element => {
  return (
    <div className={`${className} eb-input__text eb-input__text--textarea`}>
      <Icon icon={icon} className="eb-input__text-icon" />
      <textarea data-gramm_editor="false" value={value} {...props} />
      {children}
    </div>
  );
};

export interface TextAreaProps extends InputProps {
  icon?: Icons;
}

export default withInput(TextArea, [InputFeatures.LABEL]);
