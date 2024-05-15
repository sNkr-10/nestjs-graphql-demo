import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { FETCH_LIMIT } from '../../../lib/config/constants';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  page: number = 1;

  @Field(() => Int, { defaultValue: FETCH_LIMIT })
  @IsInt()
  limit: number = FETCH_LIMIT;
}
