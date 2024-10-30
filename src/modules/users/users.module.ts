import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
