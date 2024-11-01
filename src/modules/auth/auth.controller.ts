import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './interfaces/service';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto, Token } from './interfaces/messages';
@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('validateToken')
  validateToken(token: Token) {
    return this.authService.validateToken(token);
  }
}
