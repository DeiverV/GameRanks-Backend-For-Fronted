import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-options-scores';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCORES_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [ScoresController],
  providers: [],
})
export class ScoresModule {}
