import SeederInterface from '@doorward/backend/database/SeederInterface';
import { EntityManager } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';

export class CreateDefaultUsers1598854206712 extends SeederInterface {
  async seed(entityManager: EntityManager): Promise<any> {}

  async rollback(entityManager: EntityManager): Promise<any> {
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where({ id: process.env.DEFAULT_ADMIN_ID })
      .execute();
  }
}
