import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import Chat from '@doorward/chat/Chat';

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props): JSX.Element => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="Messaging" noNavBar>
      <Chat
        conversations={[
          {
            recipient: {
              name: 'Moses Gitau',
              picture: '',
            },
            messages: [{ text: 'How are you doing today?', createdAt: new Date(), updatedAt: new Date() }],
          },
          {
            recipient: {
              name: 'Jennifer Moko',
              picture: '',
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
