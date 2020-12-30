import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
