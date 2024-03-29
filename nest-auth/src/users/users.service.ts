// users/users.service.ts
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'gang',
      password: '123123',
    },
    {
      userId: 2,
      username: 'ko',
      password: '1234',
    },
  ];
  //실제로는 DB의 데이터를 사용할 것
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
