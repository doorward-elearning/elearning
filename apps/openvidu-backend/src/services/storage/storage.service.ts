import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class StorageService {
  redis: Redis;
  public constructor(private redisService: RedisService) {
    this.redis = redisService.getClient();
  }
}
