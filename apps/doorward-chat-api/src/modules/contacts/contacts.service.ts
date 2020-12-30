import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';

@Injectable()
export class ContactsService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   * Get a list of people someone can contact.
   */
  async getContacts() {
    return this.usersRepository.find();
  }
}
