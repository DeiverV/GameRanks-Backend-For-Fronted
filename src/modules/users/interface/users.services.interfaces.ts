import { Observable } from "rxjs";

export interface Pagination {
  page: number;
  limit: number;
  totalCount?: number;
  totalPages?: number;
}

export interface UserBase {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
}

export interface UserSummary extends UserBase {
  game: string;
  highestScore: number;
}

export interface UserDetails extends UserBase {
  role: string;
  isBlocked: boolean;
  rank: number;
  highestScore: number;
}

export interface UserIdDto {
  userId: string;
}

export interface UpdateUserDto extends UserIdDto {
  username: string;
  image: Uint8Array;
}

export interface PaginationDto extends Pagination {}

export interface GetUserDetailsDto {
  username: string;
}

export interface CreateUserDto {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface ValidateUserDto {
  email: string;
  password: string;
}

export interface PagedResponse<T> extends Pagination {
  data: T[];
}

export type AllPlayerResponse = PagedResponse<UserDetails>;
export type GetUserByGameResponse = PagedResponse<UserSummary>;

export interface User extends UserBase {
  password: string;
  role: string;
  isBlocked: boolean;
  isActive: boolean;
}

export interface GetUserByGameDto {
  page: number;
  limit: number;
  game: string;
}

export interface UsersService {
  createUser(request: CreateUserDto): Observable<Empty>;
  validateUser(request: ValidateUserDto): Observable<User>;
  getUserDetails(request: GetUserDetailsDto): Observable<UserDetails>;
  getAllPlayers(request: PaginationDto): Observable<AllPlayerResponse>;
  getUsersByGame(request: GetUserByGameDto): Observable<GetUserByGameResponse>;
  updateUser(request: UpdateUserDto): Observable<UserDetails>;
  deleteUser(request: UserIdDto): Observable<Empty>;
  blockOrUnblockUser(request: UserIdDto): Observable<Empty>;
}

export interface Empty {}
