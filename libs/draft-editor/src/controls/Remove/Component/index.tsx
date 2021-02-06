/* @flow */

import React from 'react';
import classNames from 'classnames';

import Option from '../../../components/Option';
import './styles.css';

const RemoveComponent: React.FunctionComponent<RemoveComponentProps> = ({
  config,
  onChange,
  translations,
}): JSX.Element => {
  const { icon, className, title } = config;
  return (
    <div className="rdw-remove-wrapper" aria-label="rdw-remove-control">
      <Option
        className={classNames(className)}
        onClick={onChange}
        title={title || translations['components.controls.remove.remove']}
      >
        <img src={icon} alt="" />
      </Option>
    </div>
  );
};

interface RemoveComponentProps {
  onChange: Function;
  config: Record<string, any>;
  translations: Record<string, any>;
}

export default RemoveComponent;
