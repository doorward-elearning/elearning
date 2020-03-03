import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@edudoor/ui/types';
import Chat from '@edudoor/chat/Chat';

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props): JSX.Element => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="Messaging" noNavBar>
      <Chat
        conversations={[
          {
            recipient: {
              name: 'Moses Gitau',
            },
            messages: [{ text: 'How are you doing today?', createdAt: new Date(), updatedAt: new Date() }],
          },
          {
            recipient: {
              name: 'Jennifer Moko',
            },
            messages: [{ text: 'How was the meeting yesterday?', createdAt: new Date(), updatedAt: new Date() }],
          },
        ]}
      />
    </Layout>
  );
};

export interface ChatScreenProps extends PageComponent {}

export default ChatScreen;
