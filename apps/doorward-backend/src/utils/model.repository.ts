import { Repository, DeepPartial } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import BaseEntity from '../database/entities/base.entity';

export class ModelRepository<T extends BaseEntity> extends Repository<T> {
  async get(id: string, relations: string[] = [], throwsException = false): Promise<T> {
    return await this.findOne({
      where: { id },
      relations,
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity);
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(inputs: DeepPartial<T>, relations: string[] = []): Promise<T> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(entity: T, inputs: QueryDeepPartialEntity<T>, relations: string[] = []): Promise<T> {
    return this.update(entity.id, inputs)
      .then(async () => await this.get(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }
}
