import { Controller, Post, UseGuards, Injectable, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() requestUserInfo) {
    return requestUserInfo;
  }
}
