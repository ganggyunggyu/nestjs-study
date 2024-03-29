import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //읽기 전용으로 users 배열을 가져온다.
  async validateUser(username: string, pass: string): Promise<any> {
    //존재 하는 유저인지 판별하는 메서드
    //실제로는 password를 bcrypt와 같은 해싱 작업이 필요
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(password);
      //local.storage.ts로 username 전달
      return result;
    }
    return null;
  }

  //JWT 생성
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    //JWT 표준과 일관성 유지를 위해 sub라는 속성 이름으로 userId를 보관
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
