import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
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
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return res;
  }

  @Post('validateToken')
  async validateToken(token: Token) {
    const res = await this.authService.validateToken(token);
    return res;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(token: Token) {
    const res = await this.authService.logout(token);
    return res;
  }
}
