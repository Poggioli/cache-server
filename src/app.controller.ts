import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheRequestDTO } from './app.types';

@Controller('caches')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  setCache(@Body() { key, data, ttl }: CacheRequestDTO): Promise<void> {
    return this.appService.setCache(key, data, ttl);
  }

  @Get(':key')
  getCacheByKey(@Param() param: any): Promise<any> {
    return this.appService.getCacheByKey(param.key);
  }

  @Delete(':key')
  invalidateCache(@Param() param: any): Promise<void> {
    return this.appService.invalidateCache(param.key);
  }

  @Delete()
  clearCache(): Promise<void> {
    return this.appService.clearCache();
  }

  @Get()
  getAllKeys(): Promise<string[]> {
    return this.appService.getAllKeys();
  }
}
