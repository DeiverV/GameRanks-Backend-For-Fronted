import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-options-auth';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
