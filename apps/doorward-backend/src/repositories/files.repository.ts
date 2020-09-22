import OrganizationBasedRepository from '../utils/organization.based.repository';
import FileEntity from '@doorward/common/entities/file.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(FileEntity)
export class FilesRepository extends OrganizationBasedRepository<FileEntity> {
  public async getAllByUser(userId: string) {
    return this.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
  }

  public async getAllPublicFiles() {
    return this.find({
      where: { public: true },
      relations: ['owner'],
    });
  }
}
