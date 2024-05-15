import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationInput } from '../../../lib/common/dto/pagination.input';

@InputType()
export class UserListInput extends PaginationInput {
  @Field({ defaultValue: '' })
  @IsString()
  @IsOptional()
  search: string | null = '';
}
