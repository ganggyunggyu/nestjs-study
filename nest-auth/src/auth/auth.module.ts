import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './storage/local. strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

/**
 * 앱은 두가지 상태로 존재한다.
 * 로그인이 되어있지 않은 상태 (인증되지않음)
 * 로그인이 되어있는 상태 (인증됨)
 */

/**
 * 첫번째의 경우 수행해야 하는 기능
 * 1. 제한된 경로에 대한 엑세스 거부
 * 제한된 경로 즉 보호된 라우트에는 Guard를 배치하여 guard 기능을 사용할 것
 * guard는 유효한 토큰이 있는지 확인할 것
 *
 * 2. 로그인을 시도할 때 인증 해주는 기능
 * 토큰을 발급하는 단계이다.
 * 인증을 시작하기 위해서는 email/password & credentials를 POST하는 과정이 필요하다.
 * 이를 처리하기 위한 auth/login POST 경로 설정이 필요하다.
 * 어떻게 passport-local 전략을 호출할 것인가?
 *
 * 이 두가지의 기능은 다른 Guard를 사용할 것이다.
 * 1번 항목의 경우 local.storage 모듈에서 passport 내장 가드를 사용한다.
 *
 * 2번 항목의 경우 로그인한 사용자가 제한된 경로로 이동할 수 있도록 표준 유형의 guard에 의존
 */

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtModule],
  //LocalStrategy 구현을 사용할 수 있도록 업데이트
  exports: [AuthService, JwtModule, PassportModule],
  //내보내기
})
export class AuthModule {}
