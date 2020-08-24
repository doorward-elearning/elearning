import { Injectable } from '@nestjs/common';
import RolesRepository from '../../repositories/roles.repository';
import RoleEntity from '@doorward/common/entities/role.entity';

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
}
