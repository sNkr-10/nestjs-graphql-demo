import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import * as checkHashedPassword from '../../lib/utils/checkHashedPassword';
import * as auth from '../../lib/utils/auth';
import { UserListInput } from './dto/user-list.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(() => {
        return {
          id: 1,
          name: 'John Doe',
          email: 'test@test.com',
          password: 'hashed-password',
          salt: 'some-salt',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      findUnique: jest.fn(() => {
        return {
          id: 1,
          name: 'John Doe',
          email: 'test@test.com',
          password: 'hashed-password',
          salt: 'some-salt',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      findMany: jest.fn(() => {
        return [
          {
            id: 1,
            name: 'John Doe',
            email: 'test@test.com',
            password: 'hashed-password',
            salt: 'some-salt',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }),
      count: jest.fn(() => 1),
      update: jest.fn(() => {
        return {
          id: 1,
          name: 'John Doe',
          email: 'test@test.com',
          password: 'hashed-password',
          salt: 'some-salt',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      delete: jest.fn(() => {
        return {
          id: 1,
          name: 'John Doe',
          email: 'test@test.com',
          password: 'hashed-password',
          salt: 'some-salt',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user with hashed password and salt', async () => {
      const createUserInput: CreateUserInput = {
        name: 'John Doe',
        email: 'johndoe@example1.com',
        password: 'Password@123',
      };
      const createdUser = {
        id: 1,
        name: 'John Doe',
        email: 'test@test.com',
        password: 'hashed-password',
        salt: 'some-salt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.user, 'create').mockResolvedValue(createdUser);
      expect(await userService.signUp(createUserInput)).toBe(createdUser);
    });
  });

  describe('loginUser', () => {
    it('should return the user if the login credentials are valid', async () => {
      const loginUserInput: LoginUserInput = {
        email: 'test@test.com',
        password: 'Password@123',
      };
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'test@test.com',
        password: 'hashed-password',
        salt: 'some-salt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      jest
        .spyOn(checkHashedPassword, 'checkHashedPassword')
        .mockReturnValue(true);
      jest.spyOn(auth, 'generateAccessToken').mockReturnValue('access-token');
      expect(await userService.loginUser(loginUserInput)).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user: (({ salt, password, ...rest }) => rest)(user),
        token: 'access-token',
      });
    });
  });

  describe('findOneUser', () => {
    it('should return the user with the specified id', async () => {
      const userId = 1;
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'test@test.com',
        password: 'hashed-password',
        salt: 'some-salt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      expect(await userService.findOneUser(userId)).toEqual(user);
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const userListInput: UserListInput = {
        search: 'test',
        limit: 10,
        page: 1,
      };
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'test@test.com',
          password: 'hashed-password',
          salt: 'some-salt',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);
      jest.spyOn(prisma.user, 'count').mockResolvedValue(1);
      expect(await userService.findAllUsers(userListInput)).toEqual({
        count: 1,
        users,
      });
    });
  });

  describe('updateUser', () => {
    it('should update the user with the specified id', async () => {
      const userId = 1;
      const updateUserInput: UpdateUserInput = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@test.com',
      };
      const updatedUser = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@test.com',
        password: 'hashed-password',
        salt: 'some-salt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      expect(await userService.updateUser(userId, updateUserInput)).toEqual(
        updatedUser,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete the user with the specified id', async () => {
      const userId = 1;
      const deletedUser = {
        id: 1,
        name: 'John Doe',
        email: 'test@test.com',
        password: 'hashed-password',
        salt: 'some-salt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(deletedUser);
      expect(await userService.deleteUser(userId)).toEqual(deletedUser);
    });
  });
});
