import { Observable } from 'rxjs';
import {
  GetUserScoresDto,
  UserScores,
  GetUsersRankingRequest,
  UsersScoreRanking,
  CreateScoreDto,
  ScoreId,
  Games,
  Empty,
} from './messages';

export interface ScoresService {
  getUsersRankingByGame(
    request: GetUsersRankingRequest,
  ): Promise<Observable<UsersScoreRanking>>;
  getUserScores(request: GetUserScoresDto): Promise<Observable<UserScores>>;
  getGames(request: Empty): Promise<Observable<Games>>;
  createScore(request: CreateScoreDto): Promise<Observable<Empty>>;
  deleteScore(request: ScoreId): Promise<Observable<Empty>>;
}
