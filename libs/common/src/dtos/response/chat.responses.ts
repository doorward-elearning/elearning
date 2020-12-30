import DApiResponse from '@doorward/common/dtos/response/base.response';
import { Recipient } from '@doorward/chat/types';
import { Expose } from 'class-transformer';

export class ContactsResponse extends DApiResponse {
  @Expose()
  contacts: Array<Recipient>;
}
