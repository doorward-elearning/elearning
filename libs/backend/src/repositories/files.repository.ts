import MultiOrganizationRepository from './multi.organization.repository';
import { ObjectType } from 'typeorm';
import FileEntity from '@doorward/common/entities/file.entity';

export class FilesRepository extends MultiOrganizationRepository<FileEntity> {
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

  getEntity(): ObjectType<FileEntity> {
    return FileEntity;
  }
}
