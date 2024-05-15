import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;
}
