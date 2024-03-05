import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache(key: string, data: object, ttl: number): Promise<void> {
    await this.cacheManager.set(key, data, ttl);
  }

  async getCacheByKey(key: string): Promise<any> {
    const cache = await this.cacheManager.get(key);

    if (!cache) {
      throw new NotFoundException(`Cache not found for { key: ${key} }`);
    }

    return cache;
  }

  async invalidateCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.store.reset();
  }

  async getAllKeys(): Promise<string[]> {
    const keys = await this.cacheManager.store.keys();
    return keys;
  }
}
