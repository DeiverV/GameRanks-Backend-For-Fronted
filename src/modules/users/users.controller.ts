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
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: CreateUserDto) {
    await this.usersService.createUser(data);
  }

  @Get('users/profile/:username')
  async getUserDetails(@Param('username') username: string) {
    const res = await this.usersService.getUserDetails({ username });
    return res;
  }

  @Put('users/profile')
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(@UploadedFile() file, @Body() data: UpdateUserDto) {
    const fileBase64 = file.buffer.toString('base64');
    const res = await this.usersService.updateUser({
      image: fileBase64,
      userId: data.userId,
      username: data.username,
    });

    return res;
  }

  @Get('users/admin')
  async getAllPlayers(@Query() query: PaginationDto) {
    const res = await this.usersService.getAllPlayers(query);
    return res;
  }

  @Get('users/admin')
  async GetUsersByGame(@Query() query: GetUserByGameDto) {
    const res = await this.usersService.getUsersByGame(query);
    return res;
  }

  @Delete('users/admin/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('userId') userId: string) {
    await this.usersService.deleteUser({ userId });
  }

  @Patch('users/admin/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async blockOrUnblockUser(@Param('userId') userId: string) {
    await this.usersService.blockOrUnblockUser({ userId });
  }
}
