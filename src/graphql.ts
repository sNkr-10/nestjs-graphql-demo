
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface UpdateUserInput {
    email?: Nullable<string>;
    id: number;
    name?: Nullable<string>;
}

export interface UserListInput {
    limit: number;
    page: number;
    search: string;
}

export interface LoginUser {
    token: string;
    user: User;
}

export interface IMutation {
    deleteUser(id: number): User | Promise<User>;
    loginUser(loginUserInput: LoginUserInput): LoginUser | Promise<LoginUser>;
    signUp(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
}

export interface IQuery {
    user(id: number): User | Promise<User>;
    userListData(userListInput: UserListInput): UserList | Promise<UserList>;
}

export interface ISubscription {
    userCount(): number | Promise<number>;
}

export interface User {
    createdAt: string;
    email: string;
    id: number;
    name: string;
    updatedAt: string;
}

export interface UserList {
    count: number;
    users: User[];
}

type Nullable<T> = T | null;
