import { Injectable } from '@nestjs/common';
import RolesRepository from '@doorward/backend/repositories/roles.repository';
import RoleEntity from '@doorward/common/entities/role.entity';
import { Roles } from '@doorward/common/types/roles';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  administrator(): Promise<RoleEntity> {
    return this.rolesRepository.administrator();
  }

  teacher(): Promise<RoleEntity> {
    return this.rolesRepository.teacher();
  }

  student(): Promise<RoleEntity> {
    return this.rolesRepository.student();
  }

  get(role: Roles): Promise<RoleEntity> {
    return this.rolesRepository.findOne({
      name: role,
    });
  }
}
