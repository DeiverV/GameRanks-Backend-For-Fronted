import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    url: 'localhost:50001',
    protoPath: join(__dirname, 'protos/auth.proto'),
  }
}