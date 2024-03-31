import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super();
  }

  // async canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
}
