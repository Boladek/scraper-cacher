import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import {Cache} from 'cache-manager'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  fakeValue = 'my fake value';

  @Get('cache')
  getSimpleString(){
    const value = await this.cacheManager.get('my-key')
    if(value) {
      return {
        data: value,
        loadsFrom: 'redis-store'
      }
    }
    await this.cacheManager.set('my-key', this.fakeValue, {ttl: 50});
    return {
      data: value,
      loadsFrom: 'uncached'
    }
  }
}
