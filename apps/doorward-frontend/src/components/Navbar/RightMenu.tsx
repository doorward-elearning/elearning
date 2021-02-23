import React, { useContext } from 'react';
import Icon from '@doorward/ui/components/Icon';
import useRoutes from '../../hooks/useRoutes';
import BadgeControl from '@doorward/ui/components/BadgeControl';
import { ChatContext } from '@doorward/chat/Chat';
import translate from '@doorward/common/lang/translate';

const RightMenu: React.FunctionComponent<RightMenuProps> = (props): JSX.Element => {
  const routes = useRoutes();
  const { unreadMessages } = useContext(ChatContext);
  return (
    <div>
      <BadgeControl value={unreadMessages.length}>
        <Icon
          icon="chat"
          onClick={() => {
            routes.navigate(routes.chat);
          }}
          title={translate('chat')}
        />
      </BadgeControl>
    </div>
  );
};

export interface RightMenuProps {}

export default RightMenu;
