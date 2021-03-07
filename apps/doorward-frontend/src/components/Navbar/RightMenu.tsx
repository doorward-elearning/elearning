import React, { useContext } from 'react';
import Icon from '@doorward/ui/components/Icon';
import BadgeControl from '@doorward/ui/components/BadgeControl';
import { ChatContext } from '@doorward/chat/Chat';
import translate from '@doorward/common/lang/translate';
import useAuth from '../../hooks/useAuth';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const RightMenu: React.FunctionComponent<RightMenuProps> = (props): JSX.Element => {
  const navigation = useNavigation();
  const { authenticated } = useAuth();
  const { unreadMessages } = useContext(ChatContext);
  return (
    <div>
      {authenticated && (
        <BadgeControl value={unreadMessages.length}>
          <Icon
            icon="chat"
            onClick={() => {
              navigation.navigate(ROUTES.chat.home);
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
