import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetWebDetailsArgs } from './dto/get-web-details.dto';
import { UrlToBeParsedInput } from './dto/parse-web.dto';
import { WebDetails } from './model/web-details.interface';
import { WebService } from './web.service';

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
}
