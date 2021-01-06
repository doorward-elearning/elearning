import React, { useEffect, useState } from 'react';
import { NotificationInfo } from '@doorward/ui/components/Notifications/index';
import Header from '@doorward/ui/components/Header';
import EImage from '@doorward/ui/components/Image';
import Icon from '@doorward/ui/components/Icon';
import useTransition from '@doorward/ui/hooks/useTransition';
import classNames from 'classnames';

const NotificationContent: React.FunctionComponent<NotificationContentProps> = ({
  notification,
  onClose,
  count,
  onClick,
}): JSX.Element => {
  const { close, state } = useTransition(500, onClose);
  const [currentNotification, setCurrentNotification] = useState(notification);

  useEffect(() => {
    setCurrentNotification(notification);
    const timeout = setTimeout(() => {
      close();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <div
      className={classNames({
        'ed-notifications__notification': true,
        [state]: true,
      })}
      onClick={() => {
        close();
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="ed-notifications__notification--header">
        {<span className="message-count">{count ? `(${count})` : ''}</span>}
        {currentNotification.image && <EImage src={currentNotification.image} size="small" />}
        {currentNotification.icon && <Icon icon={currentNotification.icon} />}
        <Header size={3}>{currentNotification.title}</Header>
        <Icon icon="close" onClick={close} />
      </div>
      <div className="ed-notifications__notification--content">
        <div className="ed-notifications__notification--message">{currentNotification.message}</div>
      </div>
    </div>
  );
};

export interface NotificationContentProps {
  notification: NotificationInfo;
  onClose?: () => void;
  onClick: () => void;
  count: number;
}

export default NotificationContent;
