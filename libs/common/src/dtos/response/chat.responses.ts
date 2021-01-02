import DApiResponse from '@doorward/common/dtos/response/base.response';
import { Conversation, Recipient } from '@doorward/chat/types';
import { Expose } from 'class-transformer';

export class ContactsResponse extends DApiResponse {
  @Expose()
  contacts: Array<Recipient>;
}

export class ConversationsResponse extends DApiResponse {
  @Expose()
  conversations: Array<Conversation>;
}
