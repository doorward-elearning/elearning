import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';
import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';

export default class RolesRepository extends MultiOrganizationRepository<RoleEntity> {
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

  getEntity(): ObjectType<RoleEntity> {
    return RoleEntity;
  }
}
