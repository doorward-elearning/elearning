import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import './Notifications.scss';
import NotificationContent from '@doorward/ui/components/Notifications/NotificationContent';
import { Icons } from '@doorward/ui/types/icons';

export type NotificationInfo = {
  context: string;
  image?: string;
  icon?: Icons;
  title: string;
  message: string;
  onClick?: () => void;
};

export type NotificationsContextType = {
  pushNotification: (notification: NotificationInfo) => void;
};

export const NotificationsContext = React.createContext<NotificationsContextType>({
  pushNotification: () => {},
});

const Notifications: React.FunctionComponent<NotificationsProps> = (props): JSX.Element => {
  const parent = document.getElementById('notifications-box');
  const [notifications, setNotifications] = useState<Record<string, NotificationInfo>>({});

  const pushNotification = useCallback(
    (notification: NotificationInfo) => {
      setNotifications({
        ...notifications,
        [notification.context]: notification,
      });
    },
    [notifications]
  );

  return (
    <NotificationsContext.Provider
      value={{
        pushNotification,
      }}
    >
      {ReactDOM.createPortal(
        <div className="ed-notifications">
          {Object.values(notifications)
            .filter((notification) => notification)
            .map((notification, index) => {
              return (
                <NotificationContent
                  notification={notification}
                  key={notification.context + '-' + index}
                  count={0}
                  onClose={() => {
                    setNotifications({
                      ...notifications,
                      [notification.context]: null,
                    });
                  }}
                  onClick={() => {
                    if (notification.onClick) {
                      notification.onClick();
                    }
                    setNotifications({
                      ...notifications,
                      [notification.context]: null,
                    });
                  }}
                />
              );
            })}
        </div>,
        parent
      )}
      {props.children}
    </NotificationsContext.Provider>
  );
};

export interface NotificationsProps {}

export default Notifications;
