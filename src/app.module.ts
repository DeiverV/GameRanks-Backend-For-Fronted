import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { UsersController } from './modules/users/users.controller';
import { ScoresController } from './modules/scores/scores.controller';
import { ScoresModule } from './modules/scores/scores.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ScoresModule, AuthModule, UsersModule],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    ScoresController,
  ],
  providers: [AppService],
})
export class AppModule {}
