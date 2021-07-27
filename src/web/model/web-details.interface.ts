import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WebDetails {
  @Field()
  urlId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  largestImage: string;
}

@ObjectType()
export class CacheDetails {
  @Field()
  details: string;
}
