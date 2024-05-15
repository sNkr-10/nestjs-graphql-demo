import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../../lib/prisma/prisma.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const userInput = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };
      const createdUser = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'signUp').mockResolvedValue(createdUser);
      expect(await resolver.signUp(userInput)).toBe(createdUser);
    });
  });

  describe('loginUser', () => {
    it('should return a user when valid credentials are provided', async () => {
      const credentials = {
        email: 'test@test.com',
        password: 'password123',
      };
      const result = {
        user: {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        token: 'token',
      };
      jest.spyOn(service, 'loginUser').mockResolvedValue(result);
      expect(await resolver.loginUser(credentials)).toBe(result);
    });

    it('should throw an error when invalid credentials are provided', async () => {
      const credentials = {
        email: 'test@test.com',
        password: 'wrongpassword',
      };
      jest
        .spyOn(service, 'loginUser')
        .mockImplementation(() =>
          Promise.reject(new Error('Invalid credentials')),
        );
      await expect(resolver.loginUser(credentials)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('findAllUsers', () => {
    it('should return an object having total count and an array of users', async () => {
      const result = {
        count: 0,
        users: [
          {
            id: 1,
            name: 'test',
            email: 'test@test.com',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };
      jest.spyOn(service, 'findAllUsers').mockResolvedValue(result);

      expect(
        await resolver.findAllUsers({
          search: 'test',
          page: 1,
          limit: 10,
        }),
      ).toBe(result);
    });
  });

  describe('findOneUser', () => {
    it('should return a user', async () => {
      const result = {
        id: 1,
        name: 'test',
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOneUser').mockResolvedValue(result);

      expect(await resolver.findOneUser(1)).toBe(result);
    });
  });

  describe('userCount', () => {
    it('should return an async iterator', () => {
      const iterator = resolver.userCount();
      expect(iterator).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should updateUser an existing user', async () => {
      const userInput = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      const updatedUser = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'updateUser').mockResolvedValue(updatedUser);
      expect(await resolver.updateUser(userInput)).toBe(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const userId = 1;
      const deletedUser = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'deleteUser').mockResolvedValue(deletedUser);
      expect(await resolver.deleteUser(userId)).toBe(deletedUser);
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});
