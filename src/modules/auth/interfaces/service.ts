import { Empty, LoginDto, Token } from './messages';
import { Observable } from 'rxjs';

export interface AuthService {
  validateToken(token: Token): Observable<Empty>;
  login(body: LoginDto): Observable<Token>;
}
