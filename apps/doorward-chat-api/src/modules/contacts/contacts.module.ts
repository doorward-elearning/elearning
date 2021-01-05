import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { GroupsModule } from '@doorward/backend/modules/groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), GroupsModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
