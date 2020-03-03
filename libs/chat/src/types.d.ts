interface Recipient {
  name: string;
  picture: string;
}

interface Message {
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Conversation {
  recipient: Recipient;
  messages: Array<Message>;
}
