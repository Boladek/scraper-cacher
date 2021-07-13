import { Test, TestingModule } from '@nestjs/testing';
import { WebResolver } from './web.resolver';

describe('WebResolver', () => {
  let resolver: WebResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebResolver],
    }).compile();

    resolver = module.get<WebResolver>(WebResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
