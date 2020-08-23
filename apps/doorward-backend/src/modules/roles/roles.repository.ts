import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';
import { EntityRepository } from 'typeorm';
import ModelRepository from '../../utils/model.repository';

@EntityRepository(RoleEntity)
export default class RolesRepository extends ModelRepository<RoleEntity> {
  async administrator(): Promise<RoleEntity> {
    return this.findOne({
      name: Roles.SUPER_ADMINISTRATOR,
    });
  }

  async teacher(): Promise<RoleEntity> {
    return this.findOne({
      name: Roles.TEACHER,
    });
  }

  async student(): Promise<RoleEntity> {
    return this.findOne({
      name: Roles.STUDENT,
    });
  }
}
