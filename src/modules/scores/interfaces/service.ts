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
  ): Observable<UsersScoreRanking>;
  getUserScores(request: GetUserScoresDto): Observable<UserScores>;
  getGames(request: Empty): Observable<Games>;
  createScore(request: CreateScoreDto): Observable<Empty>;
  deleteScore(request: ScoreId): Observable<Empty>;
}
