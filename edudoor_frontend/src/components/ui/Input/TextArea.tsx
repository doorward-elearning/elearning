import React from 'react';
import Icon from '../Icon';
import './styles/TextField.scss';
import withInput, { InputFeatures, InputProps } from './index';
import { Icons } from '../../../types/icons';
import classNames from 'classnames';

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  value = '',
  children,
  formikProps,
  icon,
  ...props
}): JSX.Element => {
  return (
    <div
      className={classNames({
        ['eb-input__text eb-input__text--textarea']: true,
        noIcon: !props.icon,
      })}
    >
      <Icon icon={icon} className="eb-input__text-icon" />
      <textarea data-gramm_editor="false" value={value} {...props} />
      {children}
    </div>
  );
};

export interface TextAreaProps extends InputProps {
  icon?: Icons;
}

export const BasicTextArea = TextArea;

export default withInput(TextArea, [InputFeatures.LABEL], { labelPosition: 'top' });
