import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  //AuthService에서 사용하기 위해 내보내기
})
export class UsersModule {}
