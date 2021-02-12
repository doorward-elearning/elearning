import React, { LegacyRef } from 'react';
import Icon from '../Icon';
import './styles/TextField.scss';
import withInput, { InputFeatures, InputProps } from './index';
import classNames from 'classnames';
import { Icons } from '../../types/icons';

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  value = '',
  children,
  formikProps,
  icon,
  editable,
  labelPosition,
  idGenerator,
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
      <textarea data-gramm_editor="false" {...props} value={value} ref={props.getRef} />
      {children}
    </div>
  );
};

export interface TextAreaProps extends InputProps {
  icon?: Icons;
  getRef?: LegacyRef<HTMLTextAreaElement>;
}

export const BasicTextArea = TextArea;

export default withInput(TextArea, [InputFeatures.LABEL], { labelPosition: 'top' }, true);
