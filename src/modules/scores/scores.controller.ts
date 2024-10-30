import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('scores')
export class ScoresController {
  @Get('user/scores/:username')
  getUserScores() {}

  @Get('scores/games')
  getGames() {}

  @Post('scores/leaderboard')
  createScore() {}

  @Get('scores/leaderboard')
  getLeaderboard() {}

  @Delete('users/admin/scores/:scoreId')
  deleteScore() {}
}
