import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetWebDetailsArgs {
  @Field(() => [String])
  @IsArray()
  urlIds: string[];
}
