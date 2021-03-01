import React, { useContext } from 'react';
import Icon from '@doorward/ui/components/Icon';
import BadgeControl from '@doorward/ui/components/BadgeControl';
import { ChatContext } from '@doorward/chat/Chat';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const RightMenu: React.FunctionComponent<RightMenuProps> = (props): JSX.Element => {
  const history = useHistory();
  const { unreadMessages } = useContext(ChatContext);
  return (
    <div>
      <BadgeControl value={unreadMessages.length}>
        <Icon
          icon="chat"
          onClick={() => {
            history.push('/chat');
          }}
          title={translate('chat')}
        />
      </BadgeControl>
    </div>
  );
};

export interface RightMenuProps {}

export default RightMenu;
