import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebModule } from './web/web.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    WebModule
    // CacheModule.register({
    //   store: redisStore,
    //   host: 'localhost',
    //   port: 6379
    // })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
