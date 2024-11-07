import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  async getUserScores(
    @Param('userId') userId: string,
    @Query() query: GetUserScoresDto,
  ) {
    const res = await this.scoresService.getUserScores({ ...query, userId });
    return res;
  }

  @Get('scores/games')
  async getGames() {
    const res = await this.scoresService.getGames({});
    return res;
  }

  @Post('scores')
  @HttpCode(HttpStatus.CREATED)
  async createScore(@Body() body: CreateScoreDto) {
    await this.scoresService.createScore(body);
  }

  @Get('scores/leaderboard')
  async getLeaderboard(@Query() query: GetUsersRankingRequest) {
    const res = await this.scoresService.getUsersRankingByGame(query);
    return res;
  }

  @Delete('users/admin/scores/:scoreId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteScore(@Param('scoreId') scoreId: string) {
    await this.scoresService.deleteScore({ scoreId });
  }
}
