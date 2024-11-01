export interface GetUserScoresDto {
  page: number;
  limit: number;
  userId: string;
}

export interface CreateScoreDto {
  userId: string;
  score: number;
  game: string;
}

export interface Games {
  games: string[];
}

export interface UserScores {
  data: Score[];
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface ScoreId {
  scoreId: string;
}

export interface UserId {
  userId: string;
}

export interface GetUsersRankingRequest {
  page: number;
  limit: number;
  game: string;
}

export interface UserBestScore {
  score: number;
  userId: string;
}

export interface UsersScoreRanking {
  data: UserBestScore[];
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface Score {
  id: string;
  score: number;
  game: string;
  userId: string;
  createdAt: string;
}

export interface Empty {}
