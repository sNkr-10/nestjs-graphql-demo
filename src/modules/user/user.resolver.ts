import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Directive,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { LoginUser, User, UserList } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { pubSub } from '../../lib/utils/pubSub';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../lib/guards/authGuard';
import { UserListInput } from './dto/user-list.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.signUp(createUserInput);
  }

  @Mutation(() => LoginUser)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.loginUser(loginUserInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findOneUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneUser(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserList, { name: 'userListData' })
  findAllUsers(@Args('userListInput') userListInput: UserListInput) {
    return this.userService.findAllUsers(userListInput);
  }

  @Directive(
    '@deprecated(reason: "This subscription will be removed in the next version")',
  )
  @UseGuards(AuthGuard)
  @Subscription(() => Int)
  userCount() {
    return pubSub.asyncIterator('userCount');
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteUser(id);
  }
}
