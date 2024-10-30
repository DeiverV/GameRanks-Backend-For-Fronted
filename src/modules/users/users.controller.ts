import { Controller, Delete, Get, Patch, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('users/profile/:username')
  getUserDetails() {}

  @Put('user/profile/:userId')
  updateUser() {}

  @Get('users/admin')
  getAllPlayers() {}

  @Delete('users/admin/:userId')
  deleteUser() {}

  @Patch('users/admin/:userId')
  blockOrUnblockUser() {}
}
