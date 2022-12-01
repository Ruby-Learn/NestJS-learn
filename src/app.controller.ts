import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller('cache')
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  @Get('setCache')
  async setCache() {
    await this.cacheManager.set('cache', 'data');
  }

  @Get('getCache')
  async getCache() {
    const data = (await this.cacheManager.get('cache')) || 'NotFound Data';
    return { data };
  }

  @Get('resetCache')
  async resetCache() {
    await this.cacheManager.reset();
  }
}
