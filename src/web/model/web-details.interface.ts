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
