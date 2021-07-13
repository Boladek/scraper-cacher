import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebResolver } from './web.resolver';

@Module({
  providers: [WebService, WebResolver],
})
export class WebModule {}
