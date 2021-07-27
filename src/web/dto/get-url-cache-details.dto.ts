import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUrlDetailsArgs {
  @Field()
  @IsNotEmpty()
  url: string;
}