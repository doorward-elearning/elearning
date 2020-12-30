import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import Chat from '@doorward/chat/Chat';

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props): JSX.Element => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="Messaging">
      <Chat conversations={[]} />
    </Layout>
  );
};

export interface ChatScreenProps extends PageComponent {}

export default ChatScreen;
