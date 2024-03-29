import { Controller, Post, UseGuards, Injectable, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
//

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  /**
   * 로컬 가드
   * @UseGuards(AuthGuard('local'))
   * 이런 식으로 기입 해도 동작하지만 string을 기입하는 것은 좋지 않으므로
   * 자체 클래스를 생성하여 전달하는 방법으로 많이 사용된다.
   */
  @Post('auth/login')
  async login(@Body() requestUserInfo) {
    return requestUserInfo;
  }
}
