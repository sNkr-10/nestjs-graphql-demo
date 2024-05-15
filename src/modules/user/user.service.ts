import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { hashPassword } from '../../lib/utils/hashPassword';
import { checkHashedPassword } from '../../lib/utils/checkHashedPassword';
import { generateAccessToken } from '../../lib/utils/auth';
import { pubSub } from '../../lib/utils/pubSub';
import { UserListInput } from './dto/user-list.input';
import { MAX_FETCH_LIMT } from '../../lib/config/constants';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserService {
  SELECT_CLAUSE: {
    id: boolean;
    name: boolean;
    email: boolean;
    createdAt: boolean;
    updatedAt: boolean;
  };
  constructor(private prisma: PrismaService) {
    this.SELECT_CLAUSE = {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    };
  }
  async signUp(createUserInput: CreateUserInput) {
    try {
      const { salt, hashedPassword } = hashPassword(createUserInput.password);
      createUserInput.password = hashedPassword;
      const user = await this.prisma.user.create({
        select: this.SELECT_CLAUSE,
        data: { ...createUserInput, salt },
      });
      const count = await this.prisma.user.count();
      pubSub.publish('userCount', { userCount: count });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async loginUser(loginUserInput: LoginUserInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserInput.email },
      });
      const isValidPassword = checkHashedPassword(
        loginUserInput.password,
        user.salt,
        user.password,
      );
      if (isValidPassword) {
        const token = generateAccessToken({
          userId: user.id,
          email: user.email,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return { user: (({ salt, password, ...rest }) => rest)(user), token };
      }
      throw new GraphQLError('Invalid password');
    } catch (e) {
      throw new GraphQLError('Invalid email or password');
    }
  }

  async findOneUser(id: number) {
    return await this.prisma.user.findUnique({
      select: this.SELECT_CLAUSE,
      where: { id },
    });
  }

  async findAllUsers(userListInput: UserListInput) {
    const WHERE_CLAUSE = {
      OR: [
        { name: { contains: userListInput.search ?? '' } },
        { email: { contains: userListInput.search ?? '' } },
      ],
    };
    const [count, users] = await Promise.all([
      this.prisma.user.count({
        where: WHERE_CLAUSE,
      }),
      this.prisma.user.findMany({
        select: this.SELECT_CLAUSE,
        where: WHERE_CLAUSE,
        skip:
          (+userListInput.page - 1) *
          Math.min(+userListInput.limit, +MAX_FETCH_LIMT),
        take: +userListInput.limit,
      }),
    ]);
    return { count, users };
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      select: this.SELECT_CLAUSE,
      where: { id: id },
      data: updateUserInput,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      select: this.SELECT_CLAUSE,
      where: { id },
    });
  }
}
