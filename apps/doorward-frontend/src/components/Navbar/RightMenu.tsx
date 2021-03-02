import React, { useContext } from 'react';
import Icon from '@doorward/ui/components/Icon';
import BadgeControl from '@doorward/ui/components/BadgeControl';
import { ChatContext } from '@doorward/chat/Chat';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const RightMenu: React.FunctionComponent<RightMenuProps> = (props): JSX.Element => {
  const history = useHistory();
  const { authenticated } = useAuth();
  const { unreadMessages } = useContext(ChatContext);
  return (
    <div>
      {authenticated && (
        <BadgeControl value={unreadMessages.length}>
          <Icon
            icon="chat"
            onClick={() => {
              history.push('/chat');
            }}
            title={translate('chat')}
          />
        </BadgeControl>
      )}
    </div>
  );
};

export interface RightMenuProps {}

export default RightMenu;
