import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import { EntityRepository } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';

@EntityRepository(UserEntity)
export default class TeacherRepository extends UsersRepository {}
