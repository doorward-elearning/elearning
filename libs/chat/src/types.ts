export interface Recipient {
  id: string;
  fullName: string;
  profilePicture: string;
}

export enum MessageStatus {
  SENDING = 0,
  FAILED = 1,
  SENT = 2,
  DELIVERED = 3,
  READ = 4,
}

export interface ChatMessage {
  id: string;
  text: string;
  me: boolean;
  timestamp: Date;
  status: MessageStatus;
}

export interface MessageBlock {
  day: string | Date;
  messages: Array<ChatMessage>;
}

export interface Conversation {
  id: string;
  title: string;
  avatar: string;
  recipient: Recipient;
  blocks: Array<MessageBlock>;
  lastMessageTimestamp: string | Date;
}
