import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ScoresService } from './interfaces/service';
import {
  CreateScoreDto,
  GetUserScoresDto,
  GetUsersRankingRequest,
} from './interfaces/messages';

@Controller()
export class ScoresController {
  private scoresService: ScoresService;

  constructor(@Inject('SCORES_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.scoresService = this.client.getService<ScoresService>('ScoresService');
  }

  @Get('users/scores/:userId')
  getUserScores(
    @Param('userId') userId: string,
    @Query() query: GetUserScoresDto,
  ) {
    return this.scoresService.getUserScores({ ...query, userId });
  }

  @Get('scores/games')
  getGames() {
    return this.scoresService.getGames({});
  }

  @Post('scores')
  createScore(@Body() body: CreateScoreDto) {
    return this.scoresService.createScore(body);
  }

  @Get('scores/leaderboard')
  getLeaderboard(@Query() query: GetUsersRankingRequest) {
    return this.scoresService.getUsersRankingByGame(query);
  }

  @Delete('users/admin/scores/:scoreId')
  deleteScore(@Param('scoreId') scoreId: string) {
    return this.scoresService.deleteScore({ scoreId });
  }
}
