import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import Chat from '@doorward/chat/Chat';
import { MessageStatus } from '@doorward/chat/types';

const ChatScreen: React.FunctionComponent<ChatScreenProps> = (props): JSX.Element => {
  return (
    <Layout {...props} features={[LayoutFeatures.HEADER]} header="Messaging">
      <Chat
        contacts={[
          {
            id: 'jennifer',
            name: 'Jennifer Moko',
            picture: 'https://picsum.photos/200',
          },
          {
            id: 'moses',
            name: 'Moses Gitau',
            picture: 'https://picsum.photos/200',
          },
          {
            id: 'edward',
            name: 'Edward Njoroge',
            picture: 'https://picsum.photos/200',
          },
        ]}
        conversations={[
          {
            id: '2',
            recipient: {
              id: 'jennifer',
              name: 'Jennifer Moko',
              picture: 'https://picsum.photos/200',
            },
            blocks: [
              {
                day: 'Today',
                messages: [
                  {
                    text: 'Hi',
                    timestamp: new Date(),
                    me: false,
                    status: MessageStatus.READ,
                  },
                  {
                    text: 'How was the meeting yesterday?',
                    timestamp: new Date(),
                    me: false,
                    status: MessageStatus.READ,
                  },
                ],
              },
            ],
          },
          {
            id: '1',
            recipient: {
              id: 'moses',
              name: 'Moses Gitau',
              picture: 'https://picsum.photos/200',
            },
            blocks: [
              {
                day: 'Sunday',
                messages: [{ text: 'Hi?', timestamp: new Date(), me: true, status: MessageStatus.READ }],
              },
              {
                day: 'Yesterday',
                messages: [
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'Hello?', timestamp: new Date(), me: false, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                  { text: 'How are you doing today?', timestamp: new Date(), me: true, status: MessageStatus.READ },
                ],
              },
            ],
          },
        ]}
      />
    </Layout>
  );
};

export interface ChatScreenProps extends PageComponent {}

export default ChatScreen;
