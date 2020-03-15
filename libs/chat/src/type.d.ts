export interface Recipient {
  name: string;
  picture: string;
}

export interface Message {
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  recipient: Recipient;
  messages: Array<Message>;
}
