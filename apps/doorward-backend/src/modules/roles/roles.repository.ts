import OrganizationBasedRepository from '../../utils/organization.based.repository';
import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';
import { EntityRepository } from 'typeorm';

@EntityRepository(RoleEntity)
export default class RolesRepository extends OrganizationBasedRepository<RoleEntity> {
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
