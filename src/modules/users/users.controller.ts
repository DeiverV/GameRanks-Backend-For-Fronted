import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserDto,
  GetUserByGameDto,
  PaginationDto,
  UpdateUserDto,
  UsersService,
} from './interface/users.services.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UsersController {
  private usersService: UsersService;

  constructor(@Inject('USERS_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  @Post('auth/register')
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Get('users/profile/:username')
  getUserDetails(@Param('username') username: string) {
    return this.usersService.getUserDetails({ username });
  }

  @Put('users/profile')
  @UseInterceptors(FileInterceptor('image'))
  updateUser(@UploadedFile() file, @Body() data: UpdateUserDto) {
    const fileBase64 = file.buffer.toString('base64');
    return this.usersService.updateUser({
      image: fileBase64,
      userId: data.userId,
      username: data.username,
    });
  }

  @Get('users/admin')
  async getAllPlayers(@Query() query: PaginationDto) {
    return this.usersService.getAllPlayers(query);
  }

  @Get('users/admin')
  async GetUsersByGame(@Query() query: GetUserByGameDto) {
    return this.usersService.getUsersByGame(query);
  }

  @Delete('users/admin/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser({ userId });
  }

  @Patch('users/admin/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  blockOrUnblockUser(@Param('userId') userId: string) {
    return this.usersService.blockOrUnblockUser({ userId });
  }
}
