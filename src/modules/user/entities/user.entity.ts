import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class LoginUser {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}

@ObjectType()
export class UserList {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  count: number;
}
