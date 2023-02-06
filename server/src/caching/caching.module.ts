import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { CachingService } from './caching.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [ CacheModule.register({
      store: redisStore, 
      host: process.env.REDIS_HOST || 'localhost',
      port: +process.env.REDIS_HOST || 6379
    })],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
