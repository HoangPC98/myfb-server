import { Injectable } from '@nestjs/common';
import { Inject, CACHE_MANAGER } from '@nestjs/common';
//import the cache manager
import {Cache} from 'cache-manager';

@Injectable()
export class CachingService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async setter(key: string, value: any, ttl: number): Promise<any> {
    return await this.cacheManager.set(key, value, {ttl});
  }

  async getter(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async delete(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }
}
