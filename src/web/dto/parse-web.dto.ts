import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UrlToBeParsedInput {
  @Field()
  @IsNotEmpty()
  url: string;
}
