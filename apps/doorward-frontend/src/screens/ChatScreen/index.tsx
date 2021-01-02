import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import Chat from '@doorward/chat/Chat';
import useAuth from '../../hooks/useAuth';

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props): JSX.Element => {
  const auth = useAuth();

  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="Messaging">
      <Chat conversations={[]} auth={auth} />
    </Layout>
  );
};

export interface ChatScreenProps extends PageComponent {}

export default ChatScreen;
