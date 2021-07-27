import { Module, CacheModule } from '@nestjs/common';
import { WebService } from './web.service';
import { CacheResolver, WebResolver } from './web.resolver';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379}
  )],
  providers: [WebService, WebResolver, CacheResolver],
})
export class WebModule {}
