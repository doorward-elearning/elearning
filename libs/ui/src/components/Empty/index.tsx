import React, { MouseEventHandler } from 'react';
import './Empty.scss';
import Icon from '../Icon';
import classNames from 'classnames';
import IfElse from '../IfElse';
import Panel from '../Panel';
import { Icons } from '../../types/icons';
import Button from '@doorward/ui/components/Buttons/Button';
import Spacer from '../Spacer';
import translate from '@doorward/common/lang/translate';

const defaultMessage = translate.thereAreNoItemsHere();

const Empty: React.FunctionComponent<EmptyProps> = ({
  message,
  icon = 'work_outline',
  size = 'large',
  actionMessage,
  onAction,
  children,
  modelName,
}) => {
  return (
    <Panel
      className={classNames({
        'ed-content-empty': true,
        [size]: true,
      })}
    >
      <Icon icon={icon} className="ed-content-empty__icon" />
      <span className="ed-content-empty__message">
        {message || defaultMessage.replace('items', (modelName || 'items').toLowerCase())}
      </span>
      {children}
      <Spacer />
      <IfElse condition={!!actionMessage}>
        <Button theme="secondary" onClick={onAction}>
          {actionMessage}
        </Button>
      </IfElse>
    </Panel>
  );
};

export interface EmptyProps {
  message?: string;
  icon?: Icons;
  size?: 'small' | 'medium' | 'large';
  actionMessage?: string;
  onAction?: MouseEventHandler;
  modelName?: string;
}

export default Empty;
