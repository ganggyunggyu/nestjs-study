import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  /**
   * 로컬 가드
   * @UseGuards(AuthGuard('local'))
   * 이런 식으로 기입 해도 동작하지만 그 자체를 string을 기입하는 것은 좋지 않으므로
   * 자체 클래스를 생성하여 전달하는 방법으로 많이 사용된다.
   */
  @Post('auth/login')
  async login(@Body() requestUserInfo) {
    return this.authService.createAccessToken(requestUserInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() userInfo) {
    return userInfo;
  }
}
