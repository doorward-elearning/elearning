export interface Recipient {
  name: string;
  picture: string;
}

export interface Message {
  text: string;
  me: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  recipient: Recipient;
  messages: Array<Message>;
}
