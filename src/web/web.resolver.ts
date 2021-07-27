import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetSingleWebDetailsArgs } from './dto/get-single-web-details.dto';
import { GetUrlDetailsArgs } from './dto/get-url-cache-details.dto';
import { GetWebDetailsArgs } from './dto/get-web-details.dto';
import { UrlToBeParsedInput } from './dto/parse-web.dto';
import { WebDetails, CacheDetails } from './model/web-details.interface';
import { WebService } from './web.service';

//Parsing Resolver
@Resolver(() => WebDetails)
export class WebResolver {
  constructor(private readonly webService: WebService) {}

  @Mutation(() => WebDetails)
  parseUrl(
    @Args('parseUrlData') urlToBeParsedInput: UrlToBeParsedInput,
  ): Promise<WebDetails> {
    return this.webService.parseUrl(urlToBeParsedInput);
  }

  @Query(() => [WebDetails], { name: 'parsedurls', nullable: 'items' })
  getWebDetails(@Args() getWebDetailsArgs: GetWebDetailsArgs): WebDetails[] {
    return this.webService.getWebDetails(getWebDetailsArgs);
  }

  @Query(() => WebDetails, { name: 'parsedurl', nullable: true })
  getSingleWebDetails(
    @Args() getSingleWebDetailsArgs: GetSingleWebDetailsArgs,
  ): WebDetails {
    return;
  }
}

//Caching Resolver
@Resolver(() => CacheDetails)
export class CacheResolver {
  constructor(private readonly webService: WebService){}

  @Query(() => CacheDetails, { name: 'cache'})
  getCacheDetails(@Args() getUrlDetailsArgs: GetUrlDetailsArgs): Promise<CacheDetails> {
    return this.webService.cacheUrl(getUrlDetailsArgs);
  }
}
