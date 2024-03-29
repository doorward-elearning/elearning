import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from '@doorward/backend/repositories/files.repository';
import { CreateFileBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import FileEntity from '@doorward/common/entities/file.entity';

@Injectable()
export class FilesService {
  constructor(private filesRepository: FilesRepository) {}

  /**
   *
   * @param id
   */
  public async getFileById(id: string) {
    return this.filesRepository.findOne(id, {
      relations: ['owner'],
    });
  }

  /**
   *
   * @param body
   * @param user
   */
  public async createFile(body: CreateFileBody, user?: UserEntity): Promise<FileEntity> {
    return this.filesRepository.createAndSave({
      ...body,
      public: body.public || !user,
      owner: user,
    });
  }

  /**
   *
   * @param fileId
   * @param user
   */
  public async getFile(fileId: string, user?: UserEntity) {
    const file = await this.getFileById(fileId);

    if (!file.public && !user?.internal) {
      throw new NotFoundException(translate('fileDoesNotExist'));
    }
    return file;
  }

  /**
   *
   * @param user
   */
  public async getAllFiles(user?: UserEntity) {
    return user ? this.filesRepository.find({ relations: ['owner'] }) : this.filesRepository.getAllPublicFiles();
  }
}
