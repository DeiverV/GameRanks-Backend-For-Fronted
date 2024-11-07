import { Empty, LoginDto, Token } from './messages';
import { Observable } from 'rxjs';

export interface AuthService {
  validateToken(token: Token): Promise<Observable<Empty>>;
  login(body: LoginDto): Promise<Observable<Token>>;
  logout(body: Token): Promise<Observable<Empty>>;
}
